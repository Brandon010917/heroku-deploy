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
      status: "active",
    },
    include: [{ model: Post }, { model: Comment }],
  });

  res.status(200).json({ status: "success", data: { users } });
});

// Get user by id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    include: [{ model: Post }, { model: Comment, include: [{ model: Post }] }],
  });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({ status: "success", data: { user } });
});

// Create a new user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError(404, "Must provide a name and email for this reuqest")
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({ status: "success", data: { newUser } });
});

// Update a user (PUT)
exports.updateUserPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return next(
      new AppError(404, "Must provide a name and email for this request")
    );
  }

  const user = await User.findOne({
    where: {
      id,
      status: "active",
    },
  });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  await user.update({
    name,
    email,
  });

  res.status(204).json({ status: "success" });
});

// Update a user (PATCH)
exports.updateUserPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(req.body, "title", "content");

  const user = await User.findOne({
    where: {
      id,
      status: "active",
    },
  });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  await user.update({ ...data });

  res.status(204).json({ status: "success" });
});

// delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: "active",
    },
  });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  await user.update({ status: "deleted" });

  res.status(201).json({ status: "success" });
});
