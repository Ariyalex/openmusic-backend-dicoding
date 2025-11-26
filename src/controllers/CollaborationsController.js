const autoBind = require("auto-bind");
const { success } = require("../utils/responseFormatter");
const NotFoundError = require("../exceptions/NotFoundError");

class CollaborationsController {
  constructor(collaborationsModel, playlistsModel, userModel) {
    this._collaborationsModel = collaborationsModel;
    this._playlistsModel = playlistsModel;
    this._userModel = userModel;

    autoBind(this);
  }

  async postCollaborationController(req, res) {
    const { playlistId, userId } = req.body;
    const credentialId = req.user.id;

    await this._playlistsModel.verifyPlaylistOwner(playlistId, credentialId);

    const user = await this._userModel.getUserById(userId);
    if (!user) throw new NotFoundError("User tidak ditemukan");

    const collaborationId = await this._collaborationsModel.addCollaboration(
      playlistId,
      user.id
    );

    return success(res, {
      status: 201,
      data: {
        collaborationId,
      },
    });
  }

  async deleteCollaborationController(req, res) {
    const { playlistId, userId } = req.body;
    const credentialId = req.user.id;

    await this._playlistsModel.verifyPlaylistOwner(playlistId, credentialId);
    await this._collaborationsModel.deleteCollaboration(playlistId, userId);

    return success(res, {
      status: 200,
      message: "Kolaborasi berhasil dihapus",
    });
  }
}

module.exports = CollaborationsController;
