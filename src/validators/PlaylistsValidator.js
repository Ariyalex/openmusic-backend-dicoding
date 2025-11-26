const Joi = require("joi");

const playlistPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Nama playlist tidak boleh kosong",
    "any.required": "Nama playlist wajib diisi",
  }),
});

const playlistSongPayloadSchema = Joi.object({
  songId: Joi.string().required().messages({
    "string.empty": "Song id tidak boleh kosong",
    "any.required": "Song id wajib diisi",
  }),
});

module.exports = {
  playlistPayloadSchema,
  playlistSongPayloadSchema,
};
