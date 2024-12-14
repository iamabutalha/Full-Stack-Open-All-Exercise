import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import { User } from "../models/user.js";
const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: "invalid username or password",
    });
  }

  try {
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    console.log("error in login ", error);
  }
});

export default loginRouter;
