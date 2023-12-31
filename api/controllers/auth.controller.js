import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
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
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Wrong on creating the new user.",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fileds required..." });
    }
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not existed..." });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials..." });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong on signing in...",
    });
  }
};

export const google = async (req, res) => {
  const { name, email, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // console.log("find a user", user);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      // console.log("auth, newUser", newUser);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on signing in..." });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong on signing out...",
    });
  }
};
