// Models
const { Comment } = require("../models/comment.model");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Controllers
exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.findAll({
    where: {
      status: "active",
    },
    include: [{ model: User }, { model: Post }],
  });

  res.status(200).json({ status: "success", data: { comments } });
});

exports.getCommentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({
    where: { id, status: "active" },
    include: [{ model: User }, { model: Post }],
  });

  if (!comment) {
    return next(new AppError(404, "No comments found for this reuqest"));
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { text, postId, userId } = req.body;

  if (!text || !postId || !userId) {
    return next(
      new AppError(
        404,
        "Must provide a text, postId and userId for this request"
      )
    );
  }

  const newComment = await Comment.create({ text, postId, userId });

  res.status(200).json({ status: "success", data: { newComment } });
});
