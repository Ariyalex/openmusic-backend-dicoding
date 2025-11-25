const jwt = require("jsonwebtoken");
const InvariantError = require("../exceptions/InvariantError");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_KEY;
const ACCESS_TOKEN_AGE = parseInt(process.env.ACCESS_TOKEN_AGE, 10) || 1800;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_KEY;

const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_AGE });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, REFRESH_SECRET);
  },

  verifyAccessToken: (token) => {
    return jwt.verify(token, ACCESS_SECRET);
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, REFRESH_SECRET);

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvariantError("Refresh token tidak valid");
    }
  },
};

module.exports = TokenManager;
