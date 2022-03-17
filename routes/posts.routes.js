const express = require("express");

// Controllers
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostPut,
  updatePostPatch,
  deletePost,
} = require("../controllers/posts.controller");

const router = express.Router();

// GET http://localhost:4000/posts
router.get("/", getAllPosts);

// GET http://localhost:4000/posts/:id
router.get("/:id", getPostById);

// POST http://localhost:4000/posts
router.post("/", createPost);

// PUT http://localhost:4000/posts/:id
router.put("/:id", updatePostPut);

// PATCH http://localhost:4000/posts/:id
router.patch("/:id", updatePostPatch);

// DELETE http://localhost:4000/posts/:id
router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
