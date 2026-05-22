import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'schemesetu_secure_hackathon_jwt_secret_key_123', {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists in system' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Citizen'
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid user registration input parameters' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile parameters
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(450).json({ message: 'Citizen profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile parameters
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      
      // Update demographic parameters
      if (req.body) {
        user.profile = {
          fullName: req.body.fullName || user.profile.fullName,
          age: req.body.age !== undefined ? req.body.age : user.profile.age,
          gender: req.body.gender || user.profile.gender,
          state: req.body.state || user.profile.state,
          category: req.body.category || user.profile.category,
          occupation: req.body.occupation || user.profile.occupation,
          income: req.body.income !== undefined ? req.body.income : user.profile.income,
          education: req.body.education || user.profile.education,
          disabilityStatus: req.body.disabilityStatus !== undefined ? req.body.disabilityStatus : user.profile.disabilityStatus
        };
      }

      const updatedUser = await user.save();
      
      const userObj = updatedUser.toObject();
      delete userObj.password;
      res.json(userObj);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add document to user vault
// @route   POST /api/auth/profile/documents
// @access  Private
export const addProfileDocument = async (req, res) => {
  const { type, name, status } = req.body;

  if (!type || !name) {
    return res.status(400).json({ message: 'Document type and name are required' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.documents = user.documents.filter(doc => doc.type !== type);
      user.documents.push({
        type,
        name,
        url: `/uploads/${name}`,
        status: status || 'Verified'
      });

      const updatedUser = await user.save();
      const userObj = updatedUser.toObject();
      delete userObj.password;
      res.json(userObj);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete document from user vault
// @route   DELETE /api/auth/profile/documents/:id
// @access  Private
export const deleteProfileDocument = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.documents = user.documents.filter(doc => doc._id.toString() !== req.params.id);
      const updatedUser = await user.save();
      const userObj = updatedUser.toObject();
      delete userObj.password;
      res.json(userObj);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
