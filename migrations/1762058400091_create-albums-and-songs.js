/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("albums", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    name: {
      type: "text",
      notNull: true,
    },
    year: {
      type: "integer",
    },
  });

  pgm.createTable("songs", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    title: {
      type: "text",
      notNull: true,
    },
    year: {
      type: "integer",
    },
    performer: {
      type: "text",
      notNull: true,
    },
    genre: {
      type: "varchar(100)",
    },
    duration: {
      type: "integer",
    },
    album_id: {
      type: "varchar(50)",
      references: "albums(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.createIndex("songs", "album_id");
  pgm.createIndex("songs", "title");
  pgm.createIndex("albums", "name");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("songs");
  pgm.dropTable("albums");
};
