const Joi = require("joi");

const authPostPayloadSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username tidak boleh kosong",
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password tidak boleh kosong",
    "any.required": "Password wajib diisi",
  }),
});

const authPutPayloadSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refreh token tidak boleh kosong",
    "any.required": "Refresh token wajib diisi",
  }),
});

const authDeletePayloadSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "Refreh token tidak boleh kosong",
    "any.required": "Refresh token wajib diisi",
  }),
});

module.exports = {
  authPostPayloadSchema,
  authPutPayloadSchema,
  authDeletePayloadSchema,
};
