import Conversation from "../models/Conversation.js";

export const ConversationController = async (req, res) => {
    console.log(req.body.senderId, req.body.receiverId);
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })
    
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetIdConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            member: {$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}