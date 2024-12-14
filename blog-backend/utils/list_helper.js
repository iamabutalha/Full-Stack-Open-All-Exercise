export const dummy = (blogs) => {
  return 1;
};
export function totalLikesCounter(blog) {
  return blog.likes;
}

export function sizeOfArray(arr) {
  return arr.length;
}

export function favoriteBlog(arr) {
  if (arr.length === 0) {
    return null;
  }
  let max = arr[0].likes;
  let found = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].likes > max) {
      max = arr[i].likes;
      found = arr[i];
    }
  }
  return {
    title: found.title,
    author: found.author,
    likes: found.likes,
  };
}

export function mostBlog(blogArr) {
  let authorCount = {};

  blogArr.forEach((blog) => {
    let author = blog.author;
    if (!authorCount[author]) {
      authorCount[author] = 0;
    }
    authorCount[author] += 1;
  });

  let maxAuthor = null;
  let maxCount = 0;

  for (let author in authorCount) {
    let count = authorCount[author];

    if (count > maxCount) {
      maxCount = count;
      maxAuthor = author;
    }
  }
  console.log(authorCount);

  return {
    author: maxAuthor,
    blogs: maxCount,
  };
}

export const mostLikes = (blogs) => {
  let authorLikes = {};
  blogs.forEach((blog) => {
    let author = blog.author;
    let likes = blog.likes;
    if (!authorLikes[author]) {
      authorLikes[author] = 0;
    }
    authorLikes[author] += likes;
  });
  let maxlikes = 0;
  let maxAuthor = null;

  for (let author in authorLikes) {
    let totalLikes = authorLikes[author];
    if (totalLikes > maxlikes) {
      maxlikes = totalLikes;
      maxAuthor = author;
    }
  }
  return {
    author: maxAuthor,
    likes: maxlikes,
  };
};

export const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
mostBlog(blogs);
