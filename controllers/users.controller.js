const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env"
});

// Models
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: "active"
    },
    include: [{ model: Post }, { model: Comment }],
    attributes: {
      exclude: ["password"]
    }
  });

  res.status(200).json({ status: "success", data: { users } });
});

// Get user by id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({ status: "success", data: { user } });
});

// Create a new user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError(404, "Must provide a name and email for this reuqest")
    );
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  newUser.password = undefined;

  res.status(201).json({ status: "success", data: { newUser } });
});

// Update a user (PUT)
exports.updateUserPut = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  if (!name || !email) {
    return next(
      new AppError(404, "Must provide a name and email for this request")
    );
  }

  await user.update({
    name,
    email
  });

  res.status(204).json({ status: "success" });
});

// Update a user (PATCH)
exports.updateUserPatch = catchAsync(async (req, res, next) => {
  const { user } = req;
  const data = filterObj(req.body, "title", "content");

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  await user.update({ ...data });

  res.status(204).json({ status: "success" });
});

// delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(201).json({ status: "success" });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  const user = await User.findOne({
    where: { email, status: "active" }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(401, "Invalid credentials"));
  }

  user.password = undefined;

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({ status: "success", data: { token } });
});
