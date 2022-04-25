// Berkas schema.js akan digunakan untuk fokus membuat dan menuliskan objek schema data notes

const Joi = require('joi');

// TODO mari kita mulai dari membuat schema. Pada berkas schema.js, Anda bisa membuat objek schema dengan nama 'NotePayloadSchema'.
const NotePlayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// TODO silakan ekspor nilai NotePayloadSchema agar dapat digunakan pada berkas JavaScript lain (gunakan destructuring object untuk mengantisipasi pembuatan lebih dari satu nilai Schema yang di ekspor pada berkas ini ke depannya).
module.exports = { NotePlayloadSchema };
