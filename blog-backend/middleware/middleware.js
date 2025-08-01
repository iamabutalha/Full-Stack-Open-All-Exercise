import * as logger from "../utils/logger.js";

export const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};

export const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformated id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

export const tokenExtractor = (request, response, next) => {
  const token = request.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken; // Attach the decoded token directly
    next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }
};

export const unkownPoint = (request, response) => {
  response.status(404).send({ error: "unkown point" });
};
