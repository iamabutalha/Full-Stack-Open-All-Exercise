import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Blog from "./models/blog.js";
import blogRouter from "./controller/blog.js";
import userRouter from "./controller/user.js";
import loginRouter from "./controller/login.js";
import router from "./controller/testing.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = router;
  app.use("/api/testing", testingRouter);
}

export default app;
