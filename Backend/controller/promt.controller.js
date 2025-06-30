import OpenAI from "openai";
import { Promt } from "../model/promt.model.js";
import { Session } from "../model/session.model.js";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendPromt = async (req, res) => {
  const { content, sessionId } = req.body;
  const userId = req.userId;

  if (!content || !content.trim()) {
    return res.status(400).json({ errors: "Promt Content Is Required" });
  }

  try {
    let session = null;

    if (sessionId) {
      session = await Session.findOne({ _id: sessionId, userId });
    }

    if (!session) {
      const generatedTitle = content.trim().slice(0, 50);
      session = await Session.create({ userId, title: generatedTitle });
    }

    await Promt.create({ userId, sessionId: session._id, role: "user", content });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "deepseek/deepseek-r1:free",
    });

    const aiContent = completion.choices[0].message.content;

    await Promt.create({ userId, sessionId: session._id, role: "assistant", content: aiContent });

    return res.status(200).json({ reply: aiContent, sessionId: session._id });
  } catch (error) {
    console.error("Error In Promt: ", error);
    return res.status(500).json({ error: "Something Went Wrong With AI Response" });
  }
};
