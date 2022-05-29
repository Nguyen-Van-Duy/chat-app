import Users from '../models/Users.js';

export const UserController = async (req, res) => {
    const newUsers = new Users({
        userName: req.body.userName,
       email: req.body.email,
       password: req.body.password
    })

    const data = await Users.find({email: req.body.email})
    if(data.length > 0) {
        res.json({
            status: 401,
            message: "Tài khoản đã tồn tại!"
        })
        return
    }
    
    try {
        const savedUsers = await newUsers.save()
        res.status(200).json(savedUsers)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const LoginController = async (req, res) => {
    try{
        const data = await Users.find({email: req.body.email, password: req.body.password})
        console.log(data);
        if(data.length === 0) {
            res.json({
                status: 401,
                message: "Email hoặc mật khẩu không đúng!",
                data: data
            })
            return
        }
        res.status(200).json({
            status: 200,
            _id: data[0]._id,
            userName: data[0].userName,
            email: data[0].email,
        })

    } catch(err) {
        res.json({
            status: 401,
            message: err
        })
    }


    // const newUsers = new Users({
    //    email: req.body.email,
    //    password: req.body.password
    // })
    
    // try {
    //     const savedUsers = await newUsers.save()
    //     res.status(200).json(savedUsers)
    // } catch (error) {
    //     res.status(500).json({ error})
    // }
}

export const GetUserController = async (req, res) => {
    try {
        const data = await Users.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetFriendController = async (req, res) => {
    try {
        const data = await Users.find({_id: req.params.userId})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}