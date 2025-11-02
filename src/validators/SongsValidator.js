const Joi = require("joi");

const songPayloadSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title tidak boleh kosong",
    "any.required": "Title wajib diisi",
  }),
  year: Joi.number().integer().required().messages({
    "number.base": "Year harus berupa angka",
    "number.integer": "Year harus berupa angka bulat",
    "any.required": "Year wajib diisi",
  }),
  genre: Joi.string().required().messages({
    "string.empty": "Genre tidak boleh kosong",
    "any.required": "Genre wajib diisi",
  }),
  performer: Joi.string().required().messages({
    "string.empty": "Performer tidak boleh kosong",
    "any.required": "Performer wajib diisi",
  }),
  duration: Joi.number().integer().positive().optional(),
  albumId: Joi.string().optional(),
});

module.exports = { songPayloadSchema };
