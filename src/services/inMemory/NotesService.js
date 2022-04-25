/* eslint-disable no-underscore-dangle */
// Berkas NotesService.js bertanggung jawab untuk mengelola resource notes yang disimpan pada memory (array)

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  // Todo  method addNote yang menerima parameter objek note (title, body, tags) dan menambahkan notes.
  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      // TODO membangkitkan eror dengan menggunakan custom error
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  // TODO kita buat method getNotes untuk membaca seluruh note yang disimpan.
  getNotes() {
    return this._notes;
  }

  // TODO method getNoteById dengan satu parameter id untuk membaca note yang disimpan berdasarkan id yang diberikan. Untuk mendapatkan note berdasarkan id, kita bisa manfaatkan fungsi filter
  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return note;
  }

  // TODO fungsi editNoteById untuk mengubah data catatan yang disimpan. Fungsi ini menerima dua parameter yakni id dan data note terbaru dalam bentuk objek (payload yang akan diambil sebagian field yaitu title, body, tags).
  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
