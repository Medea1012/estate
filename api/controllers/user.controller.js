import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({ message: "Api route is working!" });
};

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("You can only update your own account!");
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on updating user..." });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id != req.params.id) {
    return res.status(401).json("Yon can only delete your account!");
  }
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on deleting user..." });
  }
};

export const getUserListings = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      return res.status(401).json("You can only view your own listing!");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on getting List..." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on getting user..." });
  }
};
