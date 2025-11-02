const express = require("express");
const SongsController = require("../controllers/SongsController");
const validator = require("../middlewares/validator");
const { songPayloadSchema } = require("../validators/SongsValidator");

const songsRouter = express.Router();
const songsController = new SongsController();

songsRouter.post("/", validator(songPayloadSchema), songsController.postSong);
songsRouter.get("/", songsController.getSongs);
songsRouter.get("/:id", songsController.getSongById);
songsRouter.put("/:id", validator(songPayloadSchema), songsController.putSong);
songsRouter.delete("/:id", songsController.deleteSongById);

module.exports = songsRouter;
