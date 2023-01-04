import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import morgan from "morgan";
import mongoose from "mongoose";
mongoose.set("strictQuery", "true "); // suppress warning message
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
