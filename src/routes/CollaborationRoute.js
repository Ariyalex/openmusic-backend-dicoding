const express = require("express");
const CollaborationsController = require("../controllers/CollaborationsController");
const CollaborationsModel = require("../models/CollaborationsModel");
const PlaylistModel = require("../models/PlaylistsModel");
const validator = require("../middlewares/validator");

const auth = require("../middlewares/auth");

const collaborationRouter = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const {
  collaborationsPayloadSchema,
} = require("../validators/CollaborationsValidator");
const UserModel = require("../models/UsersModel");

const collaborationsModel = new CollaborationsModel();
const playlistModel = new PlaylistModel(collaborationsModel);
const userModel = new UserModel();
const collaborationsController = new CollaborationsController(
  collaborationsModel,
  playlistModel,
  userModel
);

collaborationRouter.post(
  "/",
  auth,
  validator(collaborationsPayloadSchema),
  asyncHandler(collaborationsController.postCollaborationController)
);

collaborationRouter.delete(
  "/",
  auth,
  asyncHandler(collaborationsController.deleteCollaborationController)
);

module.exports = collaborationRouter;
