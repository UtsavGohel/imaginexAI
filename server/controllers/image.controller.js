import userModel from "../models/user.model";

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!(userId && prompt)) {
      return res
        .status(400)
        .json({ success: false, message: "Provide required details" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exist!" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }
  } catch (error) {
    throw Error(error);
  }
};
