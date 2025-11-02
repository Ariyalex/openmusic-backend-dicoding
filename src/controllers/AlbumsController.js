const { nanoid } = require("nanoid");
const AlbumsModel = require("../models/AlbumsModel");
const NotFoundError = require("../exceptions/NotFoundError");
const autoBind = require("auto-bind");

class AlbumsController {
  constructor() {
    this.albumsModel = new AlbumsModel();

    autoBind(this);
  }

  async postAlbum(req, res, next) {
    try {
      const { name, year } = req.body;
      const id = nanoid(16);
      const album = await this.albumsModel.create({ id, name, year });

      res.status(201).json({
        status: "success",
        data: { albumId: album.id },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAlbums(req, res, next) {
    try {
      const albums = await this.albumsModel.findAll();
      res.status(200).json({
        status: "success",
        data: { albums },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAlbumById(req, res, next) {
    try {
      const { id } = req.params;
      const album = await this.albumsModel.findById(id);

      if (!album) {
        throw new NotFoundError("Album tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        data: { album },
      });
    } catch (error) {
      next(error);
    }
  }

  async putAlbum(req, res, next) {
    try {
      const { id } = req.params;
      const { name, year } = req.body;
      const album = await this.albumsModel.updateById(id, { name, year });

      if (!album) {
        throw new NotFoundError("Gagal memperbarui album. Id tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        message: "Album berhasil diperbarui",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAlbumById(req, res, next) {
    try {
      const { id } = req.params;
      const album = await this.albumsModel.deleteById(id);

      if (!album) {
        throw new NotFoundError("Album gagal dihapus, Id tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        message: "Berhasil menghapus album",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AlbumsController;
