import config from "../config.js";
import jwt from "jsonwebtoken";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No Token Provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
    console.log(decoded);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ errors: "Invalid Token Or Expired" });
  }
}

export default userMiddleware;
