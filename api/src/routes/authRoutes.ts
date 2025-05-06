import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router;