import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  responses: [
    {
      voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      responseText: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  closed: {
    type: Boolean,
    default: false,
  }
});

const Poll = mongoose.model("Poll", PollSchema);
export default Poll;