import express from 'express';
import {UserController, LoginController, GetUserController} from "../controllers/UserController.js"

const router = express.Router();

router.post('/user', UserController)
router.get('/user', GetUserController)
router.post('/login', LoginController)

export default router;