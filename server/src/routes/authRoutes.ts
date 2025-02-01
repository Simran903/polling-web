import express from 'express';
import { registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser as any);

export default router;