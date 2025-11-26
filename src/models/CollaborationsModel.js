const autoBind = require("auto-bind");
const InvariantError = require("../exceptions/InvariantError");
const AuthorizationError = require("../exceptions/AuthorizationError");
const { nanoid } = require("nanoid");

class CollaborationsModel {
  constructor() {
    this._db = require("../db");

    autoBind(this);
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;

    const { rows } = await this._db.query(
      `insert into collaborations(id, playlist_id, user_id) values($1, $2, $3) returning id`,
      [id, playlistId, userId]
    );

    if (!rows.length) throw new InvariantError("Kolaborasi gagal ditambahkan");

    return rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const { rows } = await this._db.query(
      `delete from collaborations where playlist_id = $1 and user_id = $2 returning id`,
      [playlistId, userId]
    );

    if (!rows.length) throw new InvariantError("Kolaborasi gagal dihapus");
  }

  async verifyCollaborator(playlistId, userId) {
    const { rows } = await this._db.query(
      `select * from collaborations where playlist_id = $1 and user_id = $2`,
      [playlistId, userId]
    );

    if (!rows.length)
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

module.exports = CollaborationsModel;
