import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false },
  addressType: { type: String, enum: ['home', 'work', 'other'], default: 'home' }
}, { _id: true });

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: String,
  photoURL: String,
  addresses: [addressSchema],
  preferences: {
    gender: { type: String },
    ageRange: { type: String },
    style: [{ type: String }],
    fit: { type: String },
    budget: { type: String },
    categories: [{ type: String }],
    onboardingCompleted: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

export default mongoose.model('User', userSchema);
