const autoBind = require("auto-bind");
const { success } = require("../utils/responseFormatter");
const ClientError = require("../exceptions/ClientError");
const InvariantError = require("../exceptions/InvariantError");

class AuthController {
  constructor(authModel, tokenManager, userModel) {
    this._authModel = authModel;
    this._tokenManager = tokenManager;
    this._userModel = userModel;

    autoBind(this);
  }

  async login(req, res) {
    const { username, password } = req.body;

    const id = await this._userModel.verifyUserCredential(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authModel.create({ userId: id, token: refreshToken });

    return success(res, {
      status: 201,
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    const record = await this._authModel.findByToken(refreshToken);
    if (!record) throw new InvariantError("Invalid refresh token");
    if (record.revoked) throw new ClientError("Refresh token revoked");

    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return success(res, {
      status: 200,
      data: { accessToken },
    });
  }

  async revokeRefreshToken(req, res) {
    const { refreshToken } = req.body;

    const record = await this._authModel.findByToken(refreshToken);
    if (!record) throw new InvariantError("Invalid refresh token");
    if (record.revoked) throw new ClientError("Refresh token alredy revoked");
    await this._authModel.revokeByToken(refreshToken);

    return success(res, {
      status: 200,
      message: "Logged out",
    });
  }
}

module.exports = AuthController;
