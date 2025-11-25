/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("playlist_songs", {
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
  });

  pgm.createConstraint(
    "playlist_songs",
    "fk_playlist_songs-playlist_id.playlists-id",
    "foreign key(playlist_id) references playlists(id) on delete cascade"
  );

  pgm.createConstraint(
    "playlist_songs",
    "fk_playlist_songs-playlist_id.songs-id",
    "foreign key(song_id) references songs(id) on delete set null"
  );

  pgm.createIndex("playlist_songs", "song_id");
  pgm.createIndex("playlist_songs", "playlist_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropIndex("playlist_songs", "song_id");
  pgm.dropIndex("playlist_songs", "playlist_id");

  pgm.dropConstraint(
    "playlist_songs",
    "fk_playlist_songs-playlist_id.songs-id"
  );

  pgm.dropConstraint(
    "playlist_songs",
    "fk_playlist_songs-playlist_id.playlists-id"
  );

  pgm.dropTable("playlist_songs");
};
