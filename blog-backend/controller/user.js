import bcrypt from "bcrypt";
import express, { request, response } from "express";
import { User } from "../models/user.js";
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3) {
    response.status(401).json({ error: "Lenght must be greater than 3" });
    return;
  }

  try {
    const saltRound = 10;
    // here we hash the actual password that is provided in a post request
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({
      username,
      name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return response
        .status(400)
        .json({ error: "expected `username` to be unique" });
    }
  }
});

userRouter.get("/", async (request, response) => {
  let users = await User.find({}).populate("blogs");
  response.json(users);
});

export default userRouter;
