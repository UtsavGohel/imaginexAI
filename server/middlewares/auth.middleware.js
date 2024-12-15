import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      `🚀 ~ file: auth.middleware.js:15 ~ userAuth ~ verifyToken:`,
      verifyToken
    );

    if (!verifyToken) {
      res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.body.userId = verifyToken.id;

    next();
  } catch (error) {
    throw Error(error.message);
  }
};

export { userAuth };
