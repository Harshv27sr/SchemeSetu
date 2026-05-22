import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Citizen', 'Admin'],
    default: 'Citizen'
  },
  profile: {
    fullName: { type: String, default: '' },
    age: { type: Number, default: null },
    gender: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
    state: { type: String, default: 'All' },
    category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', ''], default: 'General' },
    occupation: { type: String, enum: ['Student', 'Farmer', 'Business Owner', 'Unemployed', 'Retired', 'Others', ''], default: 'Others' },
    income: { type: Number, default: 0 },
    education: { type: String, default: '' },
    disabilityStatus: { type: Boolean, default: false },
    isAadhaarVerified: { type: Boolean, default: false }
  },
  documents: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, enum: ['Uploaded', 'Pending Verification', 'Verified'], default: 'Verified' },
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Password Encryption Middleware hook
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password utility method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
