const Joi = require("joi");

const albumPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name tidak boleh kosong",
    "any.required": "Name wajib diisi",
  }),
  year: Joi.number().integer().required().messages({
    "number.base": "Year harus berupa angka",
    "number.integer": "Year harus berupa angka bulat",
    "any.required": "Year wajib diisi",
  }),
});

module.exports = { albumPayloadSchema };
