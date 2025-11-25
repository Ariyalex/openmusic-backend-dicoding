/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createType("playlist_activity_action", ["add", "delete", "update"]);

  pgm.createTable("playlist_song_activities", {
    id: {
      type: "serial",
      primaryKey: true,
      notNull: true,
    },
    playlist_id: {
      type: "integer",
      notNull: true,
    },
    song_id: {
      type: "varchar(50)",
      notNull: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    action: {
      type: "playlist_activity_action",
      notNull: true,
    },
    time: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createConstraint(
    "playlist_song_activities",
    "fk_playlist_song_activities-playlist_id.playlists-id",
    "foreign key(playlist_id) references playlists(id) on delete cascade"
  );

  pgm.createIndex("playlist_song_activities", "playlist_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropIndex("playlist_song_activities", "playlist_id");

  pgm.dropConstraint(
    "playlist_song_activities",
    "fk_playlist_song_activities-playlist_id.playlists-id"
  );

  pgm.dropTable("playlist_song_activities");
};
