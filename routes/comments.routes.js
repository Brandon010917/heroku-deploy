const express = require("express");

// Controllers
const {
  getAllComments,
  getCommentById,
  createComment
} = require("../controllers/comments.controller");

// Middlewares
const { validateSession } = require("../middlewares/auth.middleware");
const { commentExists } = require("../middlewares/comments.middleware");

const router = express.Router();

router.use(validateSession);

router.route("/").get(getAllComments).post(createComment);

router.use("/:id", commentExists).route("/:id").get(getCommentById);

module.exports = {
  commentsRouter: router
};
