import express from 'express';
import { createGrievance, getMyGrievances, getAllGrievances, replyToGrievance } from '../controllers/grievanceController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Citizen protected endpoints
router.route('/')
  .post(protect, createGrievance)
  .get(protect, getMyGrievances);

// Admin protected endpoints
router.get('/all', protect, adminOnly, getAllGrievances);
router.put('/:id/reply', protect, adminOnly, replyToGrievance);

export default router;
