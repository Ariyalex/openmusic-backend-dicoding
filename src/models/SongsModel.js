const db = require("../db");

class SongsModel {
  async create({ id, title, year, genre, performer, duration, albumId }) {
    const query =
      "insert into songs (id, title, year, genre, performer, duration, album_id) values ($1, $2, $3, $4, $5, $6, $7) returning id";
    const result = await db.query(query, [
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    ]);
    return result.rows[0];
  }

  async findAll() {
    const query = "select id, title, performer from songs order by title";
    const result = await db.query(query);
    return result.rows;
  }

  async findByAlbumId(albumId) {
    const query = "select id, title, performer from songs where album_id = $1";
    const result = await db.query(query, [albumId]);
    return result.rows;
  }

  async findById(id) {
    const query =
      "select id, title, year, genre, performer, duration, album_id from songs where id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async updateById(id, { title, year, genre, performer, duration, albumId }) {
    const query =
      "update songs set title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 where id = $7 returning id";
    const result = await db.query(query, [
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      id,
    ]);
    return result.rows[0];
  }

  async deleteById(id) {
    const query = "delete from songs where id = $1 returning id";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = SongsModel;
