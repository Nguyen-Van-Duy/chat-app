import express from 'express';
import { ConversationController, GetIdConversation } from '../controllers/ConversationController.js';

const router = express.Router();

router.post('/add', ConversationController)
router.get('/:userId', GetIdConversation)


export default router;