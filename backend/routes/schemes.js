import express from 'express';
import { getSchemes, getSchemeById, createScheme, updateScheme, deleteScheme } from '../controllers/schemeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public catalog routes
router.route('/')
  .get(getSchemes)
  .post(protect, adminOnly, createScheme); // Admin only can add a scheme

router.route('/:id')
  .get(getSchemeById)
  .put(protect, adminOnly, updateScheme) // Admin only can edit a scheme
  .delete(protect, adminOnly, deleteScheme); // Admin only can delete a scheme

export default router;
