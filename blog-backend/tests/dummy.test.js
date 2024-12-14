// import test, { describe } from "node:test";
// import { strict as assert } from "node:assert";

// import * as listHelper from "../utils/list_helper.js";
// import res from "express/lib/response.js";

// test("dummy returns one", () => {
//   const blog = [];

//   const result = listHelper.dummy(blog);
//   assert.strictEqual(result, 1);
// });

// describe("total Likes", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ];

//   test("when list has only one blog, equals the likes of that", () => {
//     const result = listHelper.totalLikesCounter(listWithOneBlog[0]);
//     assert.strictEqual(result, 7);
//   });
// });

// describe("size of array", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ];
//   test("length of the Array", () => {
//     const result = listHelper.sizeOfArray(listWithOneBlog);
//     assert.strictEqual(result, 6);
//   });
// });

// describe("favorite Blog", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ];
//   test("give data of the most likes object", () => {
//     const result = listHelper.favoriteBlog(listWithOneBlog);
//     assert.deepStrictEqual(result, {
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       likes: 12,
//     });
//   });
// });

// describe("author with max blog", () => {
//   const listWithOneBlog = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0,
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0,
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0,
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0,
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0,
//     },
//   ];
//   test("Count author with max blog", () => {
//     const result = listHelper.mostBlog(listWithOneBlog);
//     assert.deepStrictEqual(result, {
//       author: "Robert C. Martin",
//       blogs: 3,
//     });
//   });
// });

test("Sample", () => {
  expect(true).toBe(true);
});
