import Users from '../models/Users.js';

const UserController = async (req, res) => {
    // console.log(req.body.senderId, req.body.receiverId);
    const newUsers = new Users({
        userName: req.body.userName,
       email: req.body.email,
       password: req.body.password
    })
    
    try {
        const savedUsers = await newUsers.save()
        res.status(200).json(savedUsers)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export default UserController;