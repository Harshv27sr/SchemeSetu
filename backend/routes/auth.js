import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, addProfileDocument, deleteProfileDocument } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/health', (req, res) => res.status(200).json({ status: 'OK', message: 'SchemeSetu Auth API is active' }));

// Private protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/profile/documents', protect, addProfileDocument);
router.delete('/profile/documents/:id', protect, deleteProfileDocument);

export default router;
