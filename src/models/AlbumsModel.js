const db = require("../db");

class AlbumsModel {
  async create({ id, name, year }) {
    const query =
      "insert into albums (id, name, year) values ($1, $2, $3) returning id";
    const result = await db.query(query, [id, name, year]);
    return result.rows[0];
  }

  async findAll() {
    const query = "select id, name, year from albums order by name";
    const result = await db.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = "select id, name, year from albums where id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async updateById(id, { name, year }) {
    const query =
      "update albums set name = $1, year = $2 where id = $3 returning id";
    const result = await db.query(query, [name, year, id]);
    return result.rows[0];
  }

  async deleteById(id) {
    const query = "delete from albums where id = $1 returning id";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = AlbumsModel;
