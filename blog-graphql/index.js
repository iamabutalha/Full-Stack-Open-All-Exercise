const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const uuid = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();
const Author = require("./models/author.js");
const Book = require("./models/book.js");
const { GraphQLError } = require("graphql");
mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((error) => console.log(error.message));

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `

  type Author {
  name: String
  id: ID!
  born: Int
  bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String]!

  }
    enum YesNo {
    YES
    NO
    }
  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    
    bookcount: Int!
    allAuthors(author: YesNo) :[Author!]
  }
    type Mutation {
    addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String]
    ):Book


  editAuthor(
  name: String!
  born:Int!
  ):Author
    }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if (!args.author && !args.genre) {
          return await Book.find({});
        }

        let filter = {};
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (author) {
            filter.author = author._id;
          } else {
            return [];
          }
        }
        if (args.genre) {
          // return books.filter((book) => book.genres.includes(args.genre));
          filter.genre = args.genre;
          return await Book.find({ genres: { $in: [args.genre] } });
        }
        return await Book.find(filter).populate("Author");
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: Object.keys(error.error),
            },
          });
        }
        throw new GraphQLError("Internal Server Problem");
      }
    },
    allAuthors: (root, args) => {
      return authors.map((author) => ({
        ...author,
        bookCount: books.filter((book) => book.author === author.name).length,
      }));
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // const book = { ...args, id: uuid.v4() };

      const existingAuthor = await Author.findOne({ name: args.author });
      if (!existingAuthor) {
        let existingAuthor = new Author({ name: args.author, born: 0 });
        await existingAuthor.save();
        // authors = authors.concat({
        //   name: args.author,
        //   id: authors.length + 6,
        //   born: 0,
        // });
      }

      let book = new Book({
        title: args.title,
        published: args.published,
        author: existingAuthor._id,
        genres: args.genres,
      });
      // books = books.concat(book);
      await book.save();
      return book.populate("author");
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
