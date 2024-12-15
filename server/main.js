import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./_DB/config.js";
import userRouter from "./routes/user.route.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors());

await connect();

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json(200).json("API Working");
});

app.listen(PORT, () => {
  console.log("server started on", PORT);
});
