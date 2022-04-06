const express = require("express");

// Controllers
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostPut,
  updatePostPatch,
  deletePost
} = require("../controllers/posts.controller");

// Middlewares
const {
  validateSession,
  protectedAdmin
} = require("../middlewares/auth.middleware");
const { postExists } = require("../middlewares/posts.middleware");

// Utils
const { upload } = require("../utils/multer");

const router = express.Router();

router.use(validateSession);

router.route("/").get(getAllPosts).post(upload.single("postImg"), createPost);

router
  .use("/:id", postExists)
  .route("/:id")
  .get(getPostById)
  .put(updatePostPut)
  .patch(updatePostPatch)
  .delete(deletePost);

module.exports = { postsRouter: router };
