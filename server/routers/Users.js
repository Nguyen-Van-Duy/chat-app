import express from 'express';
import {UserController, LoginController, GetUserController, GetFriendController} from "../controllers/UserController.js"

const router = express.Router();

router.post('/user', UserController)
router.post('/login', LoginController)
router.get('/user/:userId', GetUserController)

export default router;