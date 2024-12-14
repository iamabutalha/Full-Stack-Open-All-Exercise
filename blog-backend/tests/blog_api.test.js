// import supertest from "supertest";
// import app from "../app.js";
// import { test, after, beforeEach, describe } from "node:test";
// import { strict as assert } from "node:assert";
// import mongoose, { get } from "mongoose";
// import Blog from "../models/blog.js";
// import blog from "../models/blog.js";
// import res from "express/lib/response.js";
// import { User } from "../models/user.js";
// import bcrypt from "bcrypt";

// const initialBlogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0,
//   },
// ];

// const loadFromDB = async () => {
//   const blogs = await Blog.find({});
//   return blogs.map((blog) => blog.toJSON());
// };

// const userInDb = async () => {
//   let user = await User.find({});
//   return user.map((u) => u.toJSON());
// };

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   console.log("cleared");

//   await Blog.insertMany(initialBlogs);
//   /*
//   for (let blog of initialBlogs) {
//     let newBlog = new Blog(blog);
//     await newBlog.save();
//   }
//     */
// });

// const api = supertest(app);

// test.only("return json and there are only 6 blogs", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);

//   const response = await api.get("/api/blogs");

//   assert.strictEqual(response.body.length, initialBlogs.length);
// });

// test.only("checks the json to return id instead of _id", async () => {
//   let response = await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
//   let result = response.body;
//   assert(result[0].id);
// });
// test.only("creates a new blog (POST) ", async () => {
//   const newBlog = {
//     title: "this is cs50",
//     author: "Bruce Lee",
//     url: "https://batman.com/",
//     likes: 19,
//   };
//   await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);
//   const blogAtEnd = await loadFromDB();
//   assert.strictEqual(blogAtEnd.length, initialBlogs.length + 1);

//   const blogTitles = blogAtEnd.map((r) => r.title);
//   assert(blogTitles.includes("this is cs50"));
// });

// test.only("if there is no like by default likes will be zero", async () => {
//   const newBlog = {
//     title: "Hello world this is me",
//     author: "Ronaldo",
//     url: "https://crono.com",
//   };

//   await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);
//   let res = await loadFromDB();
//   let resultBlog = res.find((blog) => blog.author === "Ronaldo");
//   assert.strictEqual(resultBlog.likes, 0);
// });

// test.only("title or url is missing return 400 Bad Request", async () => {
//   const newBlog = {
//     author: "Ronaldo jr",
//   };

//   await api.post("/api/blogs").send(newBlog).expect(400);
// });

// test("Deleting a blog", async () => {
//   const blogAtStart = await loadFromDB();
//   let blogToDelete = blogAtStart[0];

//   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

//   const blogAtEnd = await loadFromDB();
//   const blogTitles = blogAtEnd.map((r) => r.title);
//   assert(!blogTitles.includes(blogToDelete.title));
//   assert.strictEqual(blogAtEnd.length, initialBlogs.length - 1);
// });

// test("Successfully updating a blog", async () => {
//   let allBlogs = await loadFromDB();
//   let blogToUpdate = allBlogs[0];

//   let blog = {
//     title: "Hello world",
//     author: "CsC",
//     url: "www.csc.com",
//     likes: 190,
//   };

//   await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200);
//   let blogAtEnd = await loadFromDB();
//   let blogToCheck = blogAtEnd[0];

//   assert.strictEqual(blog.title, "Hello world");
//   assert.strictEqual(blog.likes, 190);
// });

// describe("Checking user in db", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//     const passwordHash = await bcrypt.hash("Secret", 10);
//     const user = new User({ username: "root", passwordHash });
//     await user.save();
//   });

//   test("creation successed of user", async () => {
//     const userAtStart = await userInDb();
//     const newUser = {
//       username: "kuchbe",
//       name: "hellow",
//       password: "hewii",
//     };

//     await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const userAtEnd = await userInDb();

//     assert.strictEqual(userAtEnd.length, userAtStart.length + 1);
//     const usernames = userAtEnd.map((user) => user.username);
//     assert(usernames.includes(newUser.username));
//   });

//   test("creation of user fails if the username is already taken ", async () => {
//     const userAtStart = await userInDb();

//     const newUser = {
//       username: "root",
//       name: "root",
//       password: "rrrr",
//     };
//     const result = await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(400)
//       .expect("Content-Type", /application\/json/);

//     const userAtEnd = await userInDb();
//     assert(result.body.error.includes("expected `username` to be unique"));
//     assert.strictEqual(userAtEnd.length, userAtStart.length);
//   });
// });

// after(async () => {
//   await mongoose.connection.close();
// });

test("Sample", () => {
  expect(true).toBe(true);
});
