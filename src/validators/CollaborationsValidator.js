const Joi = require("joi");

const collaborationsPayloadSchema = Joi.object({
  playlistId: Joi.string().required().messages({
    "string.empty": "Playlist id tidak boleh kosong",
    "any.required": "User id wajib diisi",
  }),
  userId: Joi.string().required().messages({
    "string.empty": "User id tidak boleh kosong",
    "any.required": "User id wajib diisi",
  }),
});

module.exports = {
  collaborationsPayloadSchema,
};
