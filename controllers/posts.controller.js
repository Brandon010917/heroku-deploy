const { ref, uploadBytes } = require("firebase/storage");

// Models
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");

// Utils
const { filterObj } = require("../utils/filterObj");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { storage } = require("../utils/firebase");

// Get all posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  // SELECT * FROM posts -> posts
  const posts = await Post.findAll({
    where: { status: "active" },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"]
        }
      },
      { model: Comment }
    ]
  });

  res.status(200).json({
    status: "success",
    data: {
      posts
    }
  });
});

// Get post by id
exports.getPostById = catchAsync(async (req, res, next) => {
  const { post } = req;

  res.status(200).json({ status: "success", data: { post } });
});

// Create a new post
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  console.log(req.body);

  if (!title || !content) {
    return next(
      new AppError(404, "Must provide a title and content for this request")
    );
  }

  const name = req.file.originalname.split(".")[0];
  const fileExtension = req.file.originalname.split(".")[1];

  const imageRef = ref(
    storage,
    `images/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imageRef, req.file.buffer);

  // INSERT INTO posts (title, content)
  // Values ('Post title 1', 'Some content 1')
  const newPost = await Post.create({
    title,
    content,
    userId: req.currentUser.id,
    postImg: imgUploaded.metadata.fullPath,
    userId: req.currentUser.id
  });

  res.status(201).json({ status: "success", data: { newPost } });
});

// Update a post (PUT)
exports.updatePostPut = catchAsync(async (req, res, next) => {
  const { post } = req;
  const { title, content } = req.body;

  if (!title || !content) {
    return next(
      new AppError(404, "Must provide a title and content for this request")
    );
  }

  // update the post
  await post.update({ title, content });

  res.status(204).json({ status: "success" });
});

// Update a post (PATCH)
exports.updatePostPatch = catchAsync(async (req, res, next) => {
  const { post } = req;
  const data = filterObj(req.body, "title", "content");

  await post.update({ ...data });

  res.status(204).json({ status: "success" });
});

// delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const { post } = req;

  // Soft delete
  await post.update({ status: "deleted" });

  res.status(201).json({ status: "success" });
});
