const autoBind = require("auto-bind");
const { success } = require("../utils/responseFormatter");
const NotFoundError = require("../exceptions/NotFoundError");

class PlaylistsController {
  constructor(playlistModel, songsModel) {
    this._playlistModel = playlistModel;
    this._songsModel = songsModel;

    autoBind(this);
  }

  async postPlaylistController(req, res) {
    const { name } = req.body;
    const id = req.user.id;
    const playlistId = await this._playlistModel.addPlaylist({
      name,
      owner: id,
    });

    return success(res, {
      status: 201,
      data: {
        playlistId,
      },
    });
  }

  async getPlaylistsController(req, res) {
    const id = req.user.id;
    const playlists = await this._playlistModel.getPlaylists(id);

    return success(res, {
      status: 200,
      data: {
        playlists,
      },
    });
  }

  async deletePlaylistController(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    await this._playlistModel.verifyPlaylistOwner(id, userId);
    await this._playlistModel.deletePlaylistById(id);

    return success(res, {
      status: 200,
      message: "Playlist berhasil dihapus",
    });
  }

  async postPlaylistSongController(req, res) {
    const { id } = req.params;
    const { songId } = req.body;
    const userId = req.user.id;

    await this._playlistModel.verifyPlaylistAccess(id, userId);

    const song = await this._songsModel.findById(songId);
    if (!song || !song.id) throw new NotFoundError("Lagu tidak ditemukan");
    const newSongId = song.id;

    await this._playlistModel.addPlaylistSong({
      playlistId: id,
      songId: newSongId,
    });

    return success(res, {
      status: 201,
      message: "Berhasi menambahkan lagu ke playlist",
    });
  }

  async getPlaylistSongsController(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    await this._playlistModel.verifyPlaylistAccess(id, userId);

    const playlist = await this._playlistModel.getPlaylist(id);
    if (!playlist) throw new NotFoundError("Playlist tidak ditemukan");

    const songs = await this._playlistModel.getPlaylistSongs(id);

    return success(res, {
      status: 200,
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    });
  }

  async deletePlaylistSongController(req, res) {
    const { id } = req.params;
    const { songId } = req.body;
    const userId = req.user.id;

    await this._playlistModel.verifyPlaylistAccess(id, userId);

    await this._playlistModel.deletePlaylistSong(id, songId);

    return success(res, {
      status: 200,
      message: "Berhasil menghapus lagu dari playlist",
    });
  }
}

module.exports = PlaylistsController;
