const autoBind = require("auto-bind");

class AuthModel {
  constructor() {
    this.db = require("../db");

    autoBind(this);
  }

  async create({ userId, token }) {
    const { rows } = await this.db.query(
      `insert into authentications(user_id, token, revoked)
      values ($1, $2, false) `,
      [userId, token]
    );

    return rows[0];
  }

  async findByToken(token) {
    const { rows } = await this.db.query(
      `select token, revoked from authentications where token = $1`,
      [token]
    );

    return rows[0] || null;
  }

  async revokeById(id) {
    await this.db.query(
      `update authentications set revoked = true where id = $1`,
      [id]
    );
  }

  async revokeByToken(token) {
    await this.db.query(
      `update authentications set revoked = true where token = $1`,
      [token]
    );
  }
}

module.exports = AuthModel;
