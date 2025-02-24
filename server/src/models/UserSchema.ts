import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define User Interface
export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  bookmarkedPolls: mongoose.Types.ObjectId[];
  totalPollsCreated: number;
  totalPollsVotes: number;
  totalPollsBookmarked: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define Schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    bookmarkedPolls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
      },
    ],
    totalPollsCreated: {
      type: Number,
      default: 0,
    },
    totalPollsVotes: {
      type: Number,
      default: 0,
    },
    totalPollsBookmarked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;