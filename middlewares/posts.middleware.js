// Models
const { Post } = require("../models/post.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.postExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: { id, status: "active" }
  });

  if (!post) {
    return next(new AppError(404, "Can't delete post, invalid id"));
  }

  req.post = post;

  next();
});
