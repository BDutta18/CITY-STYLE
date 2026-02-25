import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, pricing } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ error: 'Shipping address is required' });
    }

    const orderId = generateOrderId();
    
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const order = new Order({
      orderId,
      userId: req.user.firebaseUid,
      userEmail: req.user.email,
      items: items.map(item => ({
        productSlug: item.slug || item.productSlug,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      subtotal: pricing.subtotal,
      shippingCharges: pricing.shippingCharges,
      tax: pricing.tax,
      discount: pricing.discount,
      total: pricing.total,
      estimatedDelivery
    });

    await order.save();

    await Cart.findOneAndUpdate(
      { userId: req.user.firebaseUid },
      { items: [] }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.firebaseUid })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:orderId', authenticateUser, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId,
      userId: req.user.firebaseUid 
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:orderId/cancel', authenticateUser, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const order = await Order.findOne({ 
      orderId: req.params.orderId,
      userId: req.user.firebaseUid 
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!['placed', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
    }

    order.orderStatus = 'cancelled';
    order.cancelledAt = new Date();
    order.cancellationReason = reason || 'Cancelled by user';
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: reason || 'Cancelled by user'
    });

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
