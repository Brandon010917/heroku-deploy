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
const {
  validateSession,
  protectedAdmin
} = require("../middlewares/auth.middleware");
const {
  userExists,
  protectAccountOwner
} = require("../middlewares/users.middleware");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/", protectedAdmin, getAllUsers);

router
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .put(updateUserPut)
  .patch(protectAccountOwner, updateUserPatch)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
