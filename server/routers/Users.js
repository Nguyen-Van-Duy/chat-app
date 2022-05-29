import express from 'express';
import {UserController, LoginController, GetUserController, GetFriendController} from "../controllers/UserController.js"

const router = express.Router();

router.post('/user', UserController)
router.get('/user', GetUserController)
router.get('/user/:userId', GetFriendController)
router.post('/login', LoginController)

export default router;