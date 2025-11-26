const autoBind = require("auto-bind");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");
const { nanoid } = require("nanoid");

class PlaylistModel {
  constructor(collaborationModel) {
    this._db = require("../db");
    this._collaborationModel = collaborationModel;

    autoBind(this);
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const { rows } = await this._db.query(
      `insert into playlists(id, name, owner) values($1, $2, $3) returning id`,
      [id, name, owner]
    );

    if (!rows[0].id) throw new InvariantError("Playlist gagal ditambahkan");

    return rows[0].id;
  }

  async getPlaylists(owner) {
    const { rows } = await this._db.query(
      `select distinct p.id, p.name, u.username
       from playlists p
        left join users u on p.owner = u.id
        left join collaborations c on c.playlist_id = p.id
        where p.owner = $1 or c.user_id = $1
        order by p.name`,
      [owner]
    );

    return rows || [];
  }

  async getPlaylist(playlistId) {
    const { rows } = await this._db.query(
      `select p.id, p.name, p.owner, u.username 
      from playlists p 
      join users u on p.owner = u.id 
      where p.id = $1`,
      [playlistId]
    );

    return rows[0] || null;
  }

  async deletePlaylistById(id) {
    const { rows } = await this._db.query(
      `delete from playlists where id = $1 returning id`,
      [id]
    );

    if (!rows.length)
      throw new NotFoundError("Playlist gagal dihapus, Id tidak ditemukan");
  }

  async addPlaylistSong({ playlistId, songId }) {
    const id = `plsong-${nanoid(16)}`;
    const { rows } = await this._db.query(
      `insert into playlist_songs(id, playlist_id, song_id) values($1, $2, $3) returning id`,
      [id, playlistId, songId]
    );

    if (!rows[0].id)
      throw new InvariantError("Song gagal ditambahkan ke dalam playlist");

    return rows[0].id;
  }

  async getPlaylistSongs(playlistId) {
    const { rows } = await this._db.query(
      `select s.id, s.title, s.performer
        from playlist_songs ps
        join songs s on ps.song_id = s.id
        where ps.playlist_id = $1`,
      [playlistId]
    );

    return rows || [];
  }

  async deletePlaylistSong(playlistId, songId) {
    const { rows } = await this._db.query(
      `delete from playlist_songs where playlist_id = $1 and song_id = $2 returning id`,
      [playlistId, songId]
    );

    if (!rows.length)
      throw new InvariantError(
        "Song gagal dihapus, playlist atau song tidak ditemukan"
      );
  }

  async createActivity(playlistId, songId, userId, action) {
    const id = `activity-${nanoid(16)}`;
    const { rows } = await this._db.query(
      `insert into playlist_song_activities(id, playlist_id, song_id, user_id, action) values($1, $2, $3, $4, $5) returning id`,
      [id, playlistId, songId, userId, action]
    );

    if (!rows.length)
      throw new InvariantError("gagal membuat playlist activities");
  }

  async getPlaylistActivities(playlistId) {
    const { rows } = await this._db.query(
      `select u.username, s.title, a.action, a.time
      from playlist_song_activities a
      left join users u on a.user_id = u.id
      left join songs s on a.song_id = s.id
      where a.playlist_id = $1
      order by a.time ASC`,
      [playlistId]
    );

    return rows || [];
  }

  async verifyPlaylistOwner(id, owner) {
    const { rows } = await this._db.query(
      `select * from playlists where id = $1`,
      [id]
    );

    if (!rows.length) throw new NotFoundError("Playlist tidak ditemukan");

    const playlist = rows[0];

    if (playlist.owner !== owner) {
      console.log(`${owner} bukan merupakan owner dari playlist`);
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        console.log(error);
        throw error;
      }

      try {
        await this._collaborationModel.verifyCollaborator(playlistId, userId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}

module.exports = PlaylistModel;
