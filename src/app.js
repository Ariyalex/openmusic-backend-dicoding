const express = require("express");
const errorHandler = require("./middlewares/ErrorHandler");
const albumsRouter = require("./routes/AlbumsRoute");
const songsRouter = require("./routes/SongsRoute");

const app = express();

app.use(express.json());

app.use("/albums", albumsRouter);
app.use("/songs", songsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
