import Message from '../models/Message.js';

export const SendMessageController = async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMessageController = async (req, res) => {
    try {
        // console.log(req.params.conversationId);
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ error})
    }
}