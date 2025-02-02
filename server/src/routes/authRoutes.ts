import express from 'express';
import { signupUser, signinUser, getUserInfo } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signupUser as any);
router.post('/signin', signinUser as any);
router.get('/getUser', protect as any, getUserInfo as any);

export default router;