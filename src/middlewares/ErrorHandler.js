// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.error("Error", error.message);

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      status: error.statusCode >= 500 ? "error" : "fail",
      message: error.message,
    });
  }

  if (error.statusCode === "23505") {
    return res.status(409).json({
      status: "fail",
      message: "Data sudah ada",
    });
  }

  res.status(500).json({
    status: "error",
    message: "internal server erorr",
  });
};

module.exports = errorHandler;
