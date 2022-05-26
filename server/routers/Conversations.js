import express from 'express';
import Conversation from '../models/Conversation.js';

const router = express.Router();

router.get('/a', (req, res) => {
    res.json({
        message: "true"
    })
})

router.post('/id', async (req, res) => {
    console.log(req.body.senderId, req.body.receiverId);
    const newConversation = new Conversation({
        menbers: [req.body.senderId, req.body.receiverId],
    })
    
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({ error})
    }
})

export default router;