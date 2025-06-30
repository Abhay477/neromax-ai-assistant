import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "New Chat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Session = mongoose.model("Session", sessionSchema);
