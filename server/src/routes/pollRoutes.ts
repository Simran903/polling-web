import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createPoll } from '../controllers/pollController';

const router = express.Router();

router.post("/create", protect as any, createPoll as any);

export default router