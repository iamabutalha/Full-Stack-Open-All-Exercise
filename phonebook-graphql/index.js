const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);
const Person = require("./models/person.js");
const User = require("./models/user.js");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error.message));

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123453",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const typeDefs = `
type User {
  username: String!
  friends: [Person!]
  id: ID!
}

type Token {
value: String!
}

type Address {
  street: String!
  city: String!
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}

 enum YesNo {
    YES
    NO
  }

type Query {
  personCount: Int!
  allPersons (phone: YesNo):[Person!]
  findPerson(name: String!): Person
  me: User
}

type Mutation {
    addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
    ): Person
    editNumber(
    name: String!
    phone: String!
    ):Person

    createUser(
    username: String!
    ): User
    login(
    username: String!
    password: String!
    ):Token

    addAsFriend(
    name: String!
    ): User
}


`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    /*allPersons: async(root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person) => {
        return args.phone === "YES" ? person.phone : !person.phone;
      };

      return persons.filter(byPhone);
    },
     findPerson: async(root, args) => persons.find((p) => p.name === args.name),
    */
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exist: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },

  Mutation: {
    /*  addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args, id: uuid() };
      persons = persons.concat(person);
      return person;
    },
    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }
      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
    }, */

    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForTOken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForTOken, process.env.JWT_SECRET) };
    },
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("saving number failed", {
          extensions: {
            code: "BAD USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong Credientials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      await currentUser.save();
      return currentUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server running on ${url}`);
});
