/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("authentications", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "varchar(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    token: {
      type: "text",
      notNull: true,
    },
    revoked: {
      type: "boolean",
      notNull: true,
      default: false,
    },
  });

  pgm.createIndex("authentications", "token");
  pgm.createIndex("authentications", "user_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropIndex("authentications", "token");
  pgm.dropIndex("authentications", "user_id");

  pgm.dropTable("authentications");
};
