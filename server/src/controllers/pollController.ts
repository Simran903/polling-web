import { Request, Response } from "express";
import Poll from "../models/PollSchema";
import User from "../models/UserSchema";

interface Option {
  optionText: string;
  votes?: number;
}

export const createPoll = async (req: Request, res: Response): Promise<Response> => {
  const { question, type, options, creatorId }:
    { question: string; type: string; options?: string[]; creatorId: string } = req.body;

  if (!question || !type || !creatorId) {
    return res.status(400).json({
      message: "Question, type, and creatorId are required.",
    });
  }

  try {
    let processedOptions: Option[] = [];

    switch (type) {
      case "single-choice":
        if (!Array.isArray(options) || options.length < 2) {
          return res.status(400).json({
            message: "Single-choice poll must have at least two options.",
          });
        }
        processedOptions = options.map((option: string) => ({ optionText: option, votes: 0 }));
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value: number) => ({ optionText: value.toString() }));
        break;

      case "open-ended":
        processedOptions = [];
        break;

      case "yes/no":
        processedOptions = ["Yes", "No"].map((option: string) => ({
          optionText: option,
        }));
        break;

      case "image-based":
        if (!options || options.length < 2) {
          return res
            .status(400)
            .json({
              message: "Image-based poll must have at least two image URLs."
            })
        }
        processedOptions = options.map((url: string) => ({
          optionText: url
        }))
        break;

      default:
        return res.status(400).json({
          message: "Invalid poll type.",
        });
    }

    const newPoll = await Poll.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });

    return res.status(201).json(newPoll);

  } catch (err: any) {
    return res.status(500).json({
      message: "Error creating poll",
      error: err.message,
    });
  }
};

export const getAllPolls = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { type, creatorId, page = 1, limit = 10 } = req.query;
    
    const userId = req.body

    const filter: any = {};
    if (type) filter.type = type;
    if (creatorId) filter.creator = creatorId;

    const polls = await Poll.find(filter)
      .populate("creator", "username email profileImageUrl")
      .populate({
        path: "responses.voterId",
        select: "username profileImageUrl",
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Add "userHasVoted" flag for each poll
    const updatedPolls = polls.map((poll) => {
      const userHasVoted = userId ? poll.voters.some((voterId) => voterId.equals(userId)) : false;
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });

    const totalPolls = await Poll.countDocuments(filter);

    // Aggregation to get poll stats by type
    const stats = await Poll.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);

    // Default poll types with labels
    const allTypes = [
      { type: "single-choice", label: "Single Choice" },
      { type: "yes/no", label: "Yes/No" },
      { type: "rating", label: "Rating" },
      { type: "image-based", label: "Image Based" },
      { type: "open-ended", label: "Open Ended" },
    ];

    // Merge stats with default poll types
    const statsWithDefault = allTypes.map((pollType) => {
      const stat = stats.find((item) => item.type === pollType.type);
      return {
        label: pollType.label,
        type: pollType.type,
        count: stat ? stat.count : 0,
      };
    }).sort((a, b) => (b.count || 0) - (a.count || 0));

    return res.status(200).json({
      polls: updatedPolls,
      totalPages: Math.ceil(totalPolls / Number(limit)),
      currentPage: Number(page),
      totalPolls,
      stats: statsWithDefault,
    });

  } catch (err: any) {
    return res.status(500).json({
      message: "Error fetching polls",
      error: err.message,
    });
  }
};


// export const getVotedPolls = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     // Implementation here 
//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const getPollById = async (req: Request, res: Response): Promise<Response> => {
//   try {

//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const voteOnPoll = async (req: Request, res: Response): Promise<Response> => {
//   try {

//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const closePoll = async (req: Request, res: Response): Promise<Response> => {
//   try {

//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const bookmarkPoll = async (req: Request, res: Response): Promise<Response> => {
//   try {

//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const getBookmarkedPolls = async (req: Request, res: Response): Promise<Response> => {
//   try {

//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }

// export const deletePoll = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     // Implementation here 
//   } catch (err: any) {
//     return res.status(500).json({
//       message: "Error fetching polls",
//       error: err.message,
//     });
//   }
// }