// berkas index.js akan fokus dalam membuat fungsi sebagai validator yang menggunakan schema dari schema.js.
const InvariantError = require('../../exceptions/InvariantError');
const { NotePlayloadSchema } = require('./schema');

// TODO buat objek dengan nama NotesValidator. Kemudian, buat properti validateNotePayload dan berikan nilainya dengan fungsi kosong yang memiliki satu parameter payload.

const NotesValidator = {
  // TODO Fungsi validateNotePayload ini nantinya akan berguna untuk melakukan validasi dan mengevaluasi apakah validasi itu berhasil atau tidak.
  validateNotePayload: (payload) => {
    const validationResult = NotePlayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
