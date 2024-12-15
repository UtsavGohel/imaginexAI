import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { userAuth } from "../middlewares/auth.middleware.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "Provide required details" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPwd = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPwd,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, token: token, user: { name: user.name } });
  } catch (error) {
    throw Error(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "Provide required details" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exist!" });
    }

    const isPwdMatch = await bcrypt.compare(password, user.password);

    if (!isPwdMatch) {
      return res.status(400).json({ success: false, message: "Invalid Cred!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, token: token, user: { name: user.name } });
  } catch (error) {
    throw Error(error.message);
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    throw Error(error.message);
  }
};

export { loginUser, registerUser, userCredits };
