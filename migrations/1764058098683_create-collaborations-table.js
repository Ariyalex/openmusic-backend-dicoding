/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("collaborations", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },
    playlist_id: {
      type: "integer",
      notNull: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "collaborations",
    "unique_playlist_id_and_user_id",
    "unique(playlist_id, user_id)"
  );

  pgm.createConstraint(
    "collaborations",
    "fk_collaborations-playlist_id.playlists-id",
    "foreign key(playlist_id) references playlists(id) on delete cascade"
  );

  pgm.createConstraint(
    "collaborations",
    "fk_collaborations-playlist_id.users-id",
    "foreign key(user_id) references users(id) on delete cascade"
  );

  pgm.createIndex("collaborations", "playlist_id");
  pgm.createIndex("collaborations", "user_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropIndex("collaborations", "playlist_id");
  pgm.dropIndex("collaborations", "user_id");

  pgm.dropConstraint("collaborations", "unique_playlist_id_and_user_id");

  pgm.dropConstraint(
    "collaborations",
    "fk_collaborations-playlist_id.users-id"
  );

  pgm.dropConstraint(
    "collaborations",
    "fk_collaborations-playlist_id.playlists-id"
  );

  pgm.dropTable("collaborations");
};
