const express = require("express");
const errorHandler = require("./middlewares/ErrorHandler");
const albumsRouter = require("./routes/AlbumsRoute");
const songsRouter = require("./routes/SongsRoute");
const userRouter = require("./routes/UserRoute");
const authRouter = require("./routes/AuthRoute");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/authentications", authRouter);
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
