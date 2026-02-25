import express from 'express';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.firebaseUid });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.firebaseUid, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync', authenticateUser, async (req, res) => {
  try {
    const { items } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user.firebaseUid });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.firebaseUid, items });
    } else {
      const mergedItems = [...cart.items];
      
      items.forEach(newItem => {
        const existingIndex = mergedItems.findIndex(
          item => item.productSlug === newItem.slug && item.size === newItem.size
        );
        
        if (existingIndex > -1) {
          mergedItems[existingIndex].quantity += newItem.quantity;
        } else {
          mergedItems.push({
            productSlug: newItem.slug,
            name: newItem.name,
            image: newItem.image,
            price: newItem.price,
            quantity: newItem.quantity,
            size: newItem.size,
            color: newItem.color
          });
        }
      });
      
      cart.items = mergedItems;
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', authenticateUser, async (req, res) => {
  try {
    const { items } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user.firebaseUid });
    
    if (!cart) {
      cart = new Cart({ userId: req.user.firebaseUid, items });
    } else {
      cart.items = items;
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', authenticateUser, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user.firebaseUid },
      { items: [] }
    );
    
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
