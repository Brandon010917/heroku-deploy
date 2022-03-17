// Models
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");

// Utils
const { filterObj } = require("../utils/filterObj");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Get all posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  // SELECT * FROM posts -> posts
  const posts = await Post.findAll({
    where: { status: "active" },
    include: [{ model: User }, { model: Comment }],
  });

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

// Get post by id
exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // SELECT FROM posts WHERE id = 1
  const post = await Post.findOne({
    where: { id, status: "active" },
    include: [{ model: User }],
  });

  if (!post) {
    return next(new AppError(404, "No post found with the given id"));
  }

  res.status(200).json({ status: "success", data: { post } });
});

// Create a new post
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return next(
      new AppError(
        404,
        "Must provide a title, content and userId for this request"
      )
    );
  }

  // INSERT INTO posts (title, content)
  // Values ('Post title 1', 'Some content 1')
  const newPost = await Post.create({ title, content, userId });

  res.status(201).json({ status: "success", data: { newPost } });
});

// Update a post (PUT)
exports.updatePostPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return next(
      new AppError(404, "Must provide a title and content for this request")
    );
  }

  // SELECT * FROM posts WHERE id = 1
  const post = await Post.findOne({
    where: { id, status: "active" },
  });

  if (!post) {
    return next(new AppError(404, "Can't delete post, invalid id"));
  }

  // update the post
  await post.update({ title, content });

  res.status(204).json({ status: "success" });
});

// Update a post (PATCH)
exports.updatePostPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(req.body, "title", "content");

  const post = await Post.findOne({
    where: { id, status: "active" },
  });

  if (!post) {
    return next(new AppError(404, "Can't update post, invalid id"));
  }

  await post.update({ ...data });

  res.status(204).json({ status: "success" });
});

// delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: { id, status: "active" },
  });

  if (!post) {
    return next(new AppError(404, "Can't delete post, invalid id"));
  }

  // Soft delete
  await post.update({ status: "deleted" });

  res.status(201).json({ status: "success" });
});
