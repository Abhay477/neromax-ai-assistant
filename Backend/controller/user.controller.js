import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import config from "../config.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  //Getting Data From User
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(401).json({ errors: "User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "Signup Succeeded" });
  } catch (error) {
    console.log("Error In Signup: ", error);
    return res.status(500).json({ errors: "Error In Signup" });
  }
};

export const login = async (req, res) => {
  //Getting Data From User
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    //JWT Code
    const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.cookie("jwt", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User LoggedIn Succeeded", user, token });
  } catch (error) {
    console.log("Error In Login: ", error);
    return res.status(500).json({ errors: "Error In Login" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout Succeeded" });
  } catch (error) {
    console.log("Error In Logout: ", error);
    return res.status(500).json({ errors: "Error In Logout" });
  }
};
