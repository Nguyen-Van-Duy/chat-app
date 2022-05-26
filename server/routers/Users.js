import express from 'express';
import UserController from "../controllers/UserController.js"

const router = express.Router();

router.post('/user', UserController)

export default router;