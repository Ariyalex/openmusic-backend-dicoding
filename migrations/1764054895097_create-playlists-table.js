/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("playlists", {
    id: {
      type: "varchar(50)",
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    owner: {
      type: "varchar(50)",
      notNull: true,
    },
  });

  pgm.createConstraint(
    "playlists",
    "fk_playlists-owner.users-id",
    "foreign key(owner) references users(id) on delete cascade"
  );

  pgm.createIndex("playlists", "owner");
  pgm.createIndex("playlists", "name");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropIndex("playlists", "name");
  pgm.dropIndex("playlists", "owner");

  pgm.dropConstraint("playlists", "fk_playlists-owner.users-id");
  pgm.dropTable("playlists");
};
