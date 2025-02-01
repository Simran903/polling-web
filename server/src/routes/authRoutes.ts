import express from 'express';
import { signupUser } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signupUser as any);

export default router;