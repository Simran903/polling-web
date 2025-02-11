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
        processedOptions = options.map((option) => ({ optionText: option, votes: 0 }));
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value) => ({ optionText: value.toString() }));
        break;

      case "open-ended":
        processedOptions = [];
        break;


      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
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
        processedOptions = options.map((url) => ({
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
