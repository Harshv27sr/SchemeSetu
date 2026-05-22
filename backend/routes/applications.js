import express from 'express';
import { getMyApplications, getAllApplications, submitApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Private protected citizen routes
router.route('/')
  .get(protect, getMyApplications)
  .post(protect, submitApplication);

// Private protected admin desk routes
router.get('/all', protect, adminOnly, getAllApplications);
router.put('/:id/status', protect, adminOnly, updateApplicationStatus);

export default router;
