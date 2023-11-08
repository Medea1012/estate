import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fileds required..." });
  }
  const existedUser = await User.findOne({ username });
  const existedEmail = await User.findOne({ email });

  if (existedUser || existedEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Existed username of email..." });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Wrong on creating the new user.",
    });
  }
};
