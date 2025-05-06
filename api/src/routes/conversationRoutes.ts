import express from 'express';
import {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
} from '../controllers/conversationController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getConversations)
  .post(createConversation);

router.route('/:id')
  .get(getConversation);

router.route('/:id/messages')
  .post(sendMessage);

export default router;