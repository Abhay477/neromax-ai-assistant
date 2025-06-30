import express from "express";
import { getSessions, deleteSession, renameSession, getSessionMessages } from "../controller/session.controller.js";
import userMiddleware from "../middleware/promt.middleware.js";

const router = express.Router();

router.get("/sessions", userMiddleware, getSessions);
router.get("/session/:id", userMiddleware, getSessionMessages);
router.delete("/sessions/:id", userMiddleware, deleteSession);
router.put("/sessions/:id", userMiddleware, renameSession);

export default router;
