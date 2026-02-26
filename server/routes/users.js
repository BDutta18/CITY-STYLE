import express from 'express';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/sync', authenticateUser, async (req, res) => {
  try {
    const { displayName, photoURL } = req.body;

    let user = await User.findOne({ firebaseUid: req.user.firebaseUid });

    if (!user) {
      user = new User({
        firebaseUid: req.user.firebaseUid,
        email: req.user.email,
        displayName,
        photoURL
      });
    } else {
      if (displayName) user.displayName = displayName;
      if (photoURL) user.photoURL = photoURL;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/preferences', authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.firebaseUid });
    if (!user) {
      return res.json({ onboardingCompleted: false });
    }
    res.json(user.preferences || { onboardingCompleted: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/preferences', authenticateUser, async (req, res) => {
  try {
    const preferencesData = req.body;

    let user = await User.findOne({ firebaseUid: req.user.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.preferences = {
      ...user.preferences,
      ...preferencesData,
      onboardingCompleted: true
    };

    await user.save();
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/addresses', authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.firebaseUid });

    if (!user) {
      return res.json([]);
    }

    res.json(user.addresses || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/addresses', authenticateUser, async (req, res) => {
  try {
    const addressData = req.body;

    let user = await User.findOne({ firebaseUid: req.user.firebaseUid });

    if (!user) {
      user = new User({
        firebaseUid: req.user.firebaseUid,
        email: req.user.email,
        addresses: []
      });
    }

    if (addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(addressData);
    await user.save();

    res.status(201).json(user.addresses[user.addresses.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/addresses/:addressId', authenticateUser, async (req, res) => {
  try {
    const { addressId } = req.params;
    const addressData = req.body;

    const user = await User.findOne({ firebaseUid: req.user.firebaseUid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    if (addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    Object.assign(address, addressData);
    await user.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/addresses/:addressId', authenticateUser, async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findOne({ firebaseUid: req.user.firebaseUid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.addresses.pull(addressId);
    await user.save();

    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
