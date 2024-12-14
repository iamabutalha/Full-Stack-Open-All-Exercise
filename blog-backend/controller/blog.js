import express, { Router, response, request } from "express";
import Blog from "../models/blog.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { tokenExtractor } from "../middleware/middleware.js";

const blogRouter = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).end();
  }
  // const user = await User.findById(request.user.id);

  // if (!user) {
  //   return response.status(401).json({ error: "User Authentication required" });
  // }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    // user: user.id,
  });

  const savedBlogs = await blog.save();
  // user.blogs = user.blogs.concat(savedBlogs.id);
  // await user.save();
  response.status(201).json(savedBlogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

export default blogRouter;
