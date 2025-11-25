const express = require("express");
const AuthModel = require("../models/AuthModel");
const AuthController = require("../controllers/AuthController");
const asyncHandler = require("../utils/asyncHandler");
const {
  authPostPayloadSchema,
  authPutPayloadSchema,
  authDeletePayloadSchema,
} = require("../validators/AuthValidator");
const validator = require("../middlewares/validator");
const TokenManager = require("../tokenize/TokenManager");
const UserModel = require("../models/UsersModel");

const authRouter = express.Router();
const authModel = new AuthModel();
const userModel = new UserModel();
const authController = new AuthController(authModel, TokenManager, userModel);

authRouter.post(
  "/",
  validator(authPostPayloadSchema),
  asyncHandler(authController.login)
);

authRouter.put(
  "/",
  validator(authPutPayloadSchema),
  asyncHandler(authController.refreshToken)
);

authRouter.delete(
  "/",
  validator(authDeletePayloadSchema),
  asyncHandler(authController.revokeRefreshToken)
);

module.exports = authRouter;
