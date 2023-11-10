import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
        "https://pic1.zhimg.com/v2-e7c87873757aee017b902c929dc3552b_720w.jpg?source=172ae18b",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
