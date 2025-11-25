const Joi = require("joi");

const userPayloadSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username tidak boleh kosong",
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password tidak boleh kosong",
    "any.required": "Password wajib diisi",
  }),
  fullname: Joi.string().required().messages({
    "string.empty": "Nama tidak boleh kosong",
    "any.required": "Nama wajib diisi",
  }),
});

module.exports = {
  userPayloadSchema,
};
