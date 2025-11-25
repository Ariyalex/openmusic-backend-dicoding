const { verifyAccessToken } = require("../tokenize/TokenManager");
const { error } = require("../utils/responseFormatter");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return error(res, {
      status: 401,
      message: "No token provided",
    });
  }

  const token = header.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);

    const userId = payload.id || payload.userId;
    if (!userId) {
      return error(res, {
        status: 401,
        message: "Invalid token payload",
      });
    }

    req.user = { id: userId };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return error(res, {
        status: 401,
        message: "Tokex expired",
      });
    }
    return error(res, {
      status: 401,
      message: "Invalid token",
    });
  }
};
