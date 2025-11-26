const express = require("express");
const validator = require("../middlewares/validator");
const PlaylistsController = require("../controllers/PlaylistsController");
const PlaylistModel = require("../models/PlaylistsModel");
const SongsModel = require("../models/SongsModel");
const CollaborationsModel = require("../models/CollaborationsModel");
const {
  playlistPayloadSchema,
  playlistSongPayloadSchema,
} = require("../validators/PlaylistsValidator");

const playlistRouter = express.Router();

const auth = require("../middlewares/auth");
const asyncHandler = require("../utils/asyncHandler");

const collaborationsModel = new CollaborationsModel();
const playlistModel = new PlaylistModel(collaborationsModel);
const songsModel = new SongsModel();
const playlistController = new PlaylistsController(playlistModel, songsModel);

playlistRouter.post(
  "/",
  auth,
  validator(playlistPayloadSchema),
  asyncHandler(playlistController.postPlaylistController)
);

playlistRouter.get(
  "/",
  auth,
  asyncHandler(playlistController.getPlaylistsController)
);

playlistRouter.delete(
  "/:id",
  auth,
  asyncHandler(playlistController.deletePlaylistController)
);

playlistRouter.post(
  "/:id/songs",
  auth,
  validator(playlistSongPayloadSchema),
  asyncHandler(playlistController.postPlaylistSongController)
);

playlistRouter.get(
  "/:id/songs",
  auth,
  asyncHandler(playlistController.getPlaylistSongsController)
);

playlistRouter.delete(
  "/:id/songs",
  auth,
  validator(playlistSongPayloadSchema),
  asyncHandler(playlistController.deletePlaylistSongController)
);

module.exports = playlistRouter;
