const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Routes
const { usersRouter } = require("./routes/users.routes");
const { postsRouter } = require("./routes/posts.routes");
const { commentsRouter } = require("./routes/comments.routes");

// Utils
const { AppError } = require("./utils/appError");

// Init express app
const app = express();

if (process.env.NODE_ENV === "production") app.use(morgan("dev"));
else app.use(morgan("combined"));

// Config express
app.use(express.json());
app.use(helmet());
app.use(compression());

// Endpoints
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/comments", commentsRouter);

app.use("*", (req, res, next) => {
  return next(
    new AppError(404, `${req.originalUrl} not found in this server.`)
  );
});

// Error Handler
app.use(globalErrorHandler);

module.exports = { app };
