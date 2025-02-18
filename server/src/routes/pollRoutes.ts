import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { closePoll, createPoll, getAllPolls, getPollById, getVotedPolls, voteOnPoll } from '../controllers/pollController';

const router = express.Router();

router.post("/create", protect as any, createPoll as any);
router.get("/getAllPolls", protect as any, getAllPolls as any);
router.get("/votedPolls", protect as any, getVotedPolls as any);
router.get("/:id", protect as any, getPollById as any);
router.post("/:id/vote", protect as any, voteOnPoll as any);
router.post("/:id/close", protect as any, closePoll as any);
// router.post("/:id/bookmark", protect as any, bookmarkPoll as any);
// router.get("/user/bookmarked", protect as any, getBookmarkedPolls as any);
// router.delete("/:id/delete", protect as any, deletePoll as any);

export default router