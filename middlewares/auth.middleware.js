const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({
  path: "./config.env"
});

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError(401, "Invalid session"));

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: { id: decodedToken.id, status: "active" }
  });

  if (!user) return next(new AppError(404, "User not found"));

  req.currentUser = user;

  next();
});
