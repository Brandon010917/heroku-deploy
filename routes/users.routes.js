const express = require("express");

// Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserPut,
  updateUserPatch,
  deleteUser,
  loginUser
} = require("../controllers/users.controller");

// Middlewares
const { validateSession } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET http://localhost:4000/users
router.get("/", validateSession, getAllUsers);

// GET http://localhost:4000/users/:id
router.get("/:id", getUserById);

// POST http://localhost:4000/users
router.post("/", createUser);

// PUT http://localhost:4000/users/:id
router.put("/:id", updateUserPut);

// PATCH http://localhost:4000/users/:id
router.patch("/:id", updateUserPatch);

// DELETE http://localhost:4000/api/v1/users/:id
router.delete("/:id", deleteUser);

router.post("/login", loginUser);

module.exports = { usersRouter: router };
