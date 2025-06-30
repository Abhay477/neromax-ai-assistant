import { Session } from "../model/session.model.js";
import { Promt } from "../model/promt.model.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load sessions" });
  }
};

export const getSessionMessages = async (req, res) => {
  try {
    const messages = await Promt.find({ sessionId: req.params.id, userId: req.userId }).sort({ createdAt: 1 });
    return res.json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load messages" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    await Session.deleteOne({ _id: req.params.id, userId: req.userId });
    await Promt.deleteMany({ sessionId: req.params.id, userId: req.userId });
    return res.json({ message: "Session deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Delete failed" });
  }
};

export const renameSession = async (req, res) => {
  try {
    await Session.updateOne({ _id: req.params.id, userId: req.userId }, { title: req.body.title });
    return res.json({ message: "Renamed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Rename failed" });
  }
};
