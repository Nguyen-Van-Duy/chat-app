import express from 'express';
import {SendMessageController, GetMessageController} from '../controllers/MessageController.js'

const router = express.Router();

router.get('/:conversationId', GetMessageController)
router.post('/', SendMessageController)

export default router;