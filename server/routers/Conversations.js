import express from 'express';
import Conversation from '../models/Conversation';

const router = express.Router();

router.post('/id', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.serderId, req.body.receiveId]
    })
    res.json({
        status: 200,
        message: 'Sucsess'
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({ error})
    }
})

export default router;