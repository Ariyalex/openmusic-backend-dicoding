const express = require("express");
const AlbumsController = require("../controllers/AlbumsController");
const validator = require("../middlewares/validator");
const { albumPayloadSchema } = require("../validators/AlbumsValidator");

const albumsRouter = express.Router();
const albumsController = new AlbumsController();

albumsRouter.post(
  "/",
  validator(albumPayloadSchema),
  albumsController.postAlbum
);
albumsRouter.get("/", albumsController.getAlbums);
albumsRouter.get("/:id", albumsController.getAlbumById);
albumsRouter.put(
  "/:id",
  validator(albumPayloadSchema),
  albumsController.putAlbum
);
albumsRouter.delete("/:id", albumsController.deleteAlbumById);

module.exports = albumsRouter;
