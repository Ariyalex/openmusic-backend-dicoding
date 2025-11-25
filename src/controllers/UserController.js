const autoBind = require("auto-bind");
const { success } = require("../utils/responseFormatter");

class UserController {
  constructor(userModel) {
    this._userModel = userModel;

    autoBind(this);
  }

  async postUserController(req, res) {
    const { username, password, fullname } = req.body || {};

    const userId = await this._userModel.addUser({
      username,
      password,
      fullname,
    });

    return success(res, {
      status: 201,
      message: "User berhasil ditambahkan",
      data: {
        userId,
      },
    });
  }
}

module.exports = UserController;
