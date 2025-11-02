const { nanoid } = require("nanoid");
const NotFoundError = require("../exceptions/NotFoundError");
const SongsModel = require("../models/SongsModel");
const autoBind = require("auto-bind");

class SongsController {
  constructor() {
    this.songsModel = new SongsModel();

    autoBind(this);
  }

  async postSong(req, res, next) {
    try {
      const { title, year, genre, performer, duration, albumId } = req.body;
      const id = nanoid(16);
      const song = await this.songsModel.create({
        id,
        title,
        year,
        genre,
        duration,
        performer,
        albumId,
      });

      res.status(201).json({
        status: "success",
        data: { songId: song.id },
      });
    } catch (error) {
      next(error);
    }
  }

  async getSongs(req, res, next) {
    try {
      const songs = await this.songsModel.findAll();
      res.status(200).json({
        status: "success",
        data: { songs },
      });
    } catch (error) {
      next(error);
    }
  }

  async getSongById(req, res, next) {
    try {
      const { id } = req.params;
      const song = await this.songsModel.findById(id);

      if (!song) {
        throw new NotFoundError("Song tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        data: { song },
      });
    } catch (error) {
      next(error);
    }
  }

  async putSong(req, res, next) {
    try {
      const { id } = req.params;
      const { title, year, genre, performer, duration, albumId } = req.body;
      const song = await this.songsModel.updateById(id, {
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      if (!song) {
        throw new NotFoundError("Gagal memperbarui song. Id tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        message: "Song berhasil diperbarui",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSongById(req, res, next) {
    try {
      const { id } = req.params;
      const song = await this.songsModel.deleteById(id);

      if (!song) {
        throw new NotFoundError("Song gagal dihapus, Id tidak ditemukan");
      }

      res.status(200).json({
        status: "success",
        message: "Berhasil menghapus song",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SongsController;
