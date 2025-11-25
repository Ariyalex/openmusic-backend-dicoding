const express = require("express");
const UserController = require("../controllers/UserController");
const asyncHandler = require("../utils/asyncHandler");
const UserModel = require("../models/UsersModel");
const { userPayloadSchema } = require("../validators/UserValidator");
const validator = require("../middlewares/validator");

const userRouter = express.Router();
const userModel = new UserModel();
const userController = new UserController(userModel);

userRouter.post(
  "/",
  validator(userPayloadSchema),
  asyncHandler(userController.postUserController)
);

module.exports = userRouter;
