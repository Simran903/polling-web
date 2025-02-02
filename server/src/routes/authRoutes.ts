import express from 'express';
import { Request, Response } from "express";
import { signupUser, signinUser, getUserInfo } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/signup', signupUser as any);
router.post('/signin', signinUser as any);
router.get('/getUser', protect as any, getUserInfo as any);

router.post("/upload-image", upload.single("image"), (req: Request, res: Response): any => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    })
  }
  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  res.status(200).json({
    imageURL
  })
})

export default router;