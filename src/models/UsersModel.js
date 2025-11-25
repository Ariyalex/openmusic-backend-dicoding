const InvariantError = require("../exceptions/InvariantError");
const bcrypt = require("bcryptjs");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const autoBind = require("auto-bind");

class UserModel {
  constructor() {
    this.db = require("../db");

    autoBind(this);
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await this.db.query(
      "insert into users(username, password, fullname) values($1, $2, $3) returning id",
      [username, hashedPassword, fullname]
    );

    if (!rows.length) {
      throw new InvariantError("User gagal ditambahkan");
    }

    return rows[0].id;
  }

  async verifyNewUsername(username) {
    const { rows } = await this.db.query(
      "select username from users where username = $1",
      [username]
    );

    if (rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan user, Username sudah digunakan"
      );
    }
  }

  async getUserById(userId) {
    const { rows } = await this.db.query(
      `select id, username, fullname from users where id  = $1`,
      [userId]
    );

    if (!rows.length) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return rows[0];
  }

  async verifyUserCredential(username, password) {
    const { rows } = await this.db.query(
      `select id, password from users where username = $1`,
      [username]
    );

    if (!rows.length) {
      throw new AuthenticationError("Kredensial yang anda berikan salah");
    }

    const { id, password: hashedPassword } = rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Kredensial yang ada berikan salah");
    }

    return id;
  }

  async getUserUsername(username) {
    const { rows } = await this.db.query(
      `select id, username, fullname from users where username like $1`,
      [`%${username}%`]
    );

    return rows;
  }
}

module.exports = UserModel;
