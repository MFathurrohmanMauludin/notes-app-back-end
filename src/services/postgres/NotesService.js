// Kita gunakan teknik pool daripada client. Kenapa menggunakan teknik pool? Selain lebih mudah, tentu karena aplikasi yang kita buat akan sering sekali berinteraksi dengan database.
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  // TODO buat constructor dan di dalamnya inisialisasi properti this._pool dengan instance dari package pg.Pool.
  constructor() {
    this._pool = new Pool();
  }

  // TODO mari kita buat fungsi CRUD pertama yakni addNote. Buat nama fungsi dan parameter sama persis seperti yang ada pada inMemory -> NotesService yah.
  async addNote({ title, body, tags }) {
    // TODO buat nilai id, createdAt, dan updatedAt dengan cara yang sama seperti pada NotesService inMemory
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // TODO Selanjutnya buat objek query untuk memasukan notes baru ke database seperti ini.
    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt],
    };

    // TODO Untuk mengeksekusi query yang sudah dibuat, kita gunakan fungsi this._pool.query.
    const result = await this._pool.query(query);

    // TODO Ingat! fungsi query() berjalan secara asynchronous, dengan begitu kita perlu menambahkan async pada addNote dan await pada pemanggilan query().

    // TODO jika nilai id tidak undefined, itu berarti catatan berhasil dimasukan dan kembalikan fungsi dengan nilai id. Jika tidak maka throw InvariantError
    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getNotes() {
    // TODO kita dapatkan seluruh data notes yang ada di database dengan query “SELECT * FROM notes”
    const result = await this._pool.query('SELECT * FROM notes');

    // TODO Kembalikan nilai fungsi getNotes dengan result_rows yang telah di mapping dengan fungsi mapDBToModel.
    return result.rows.map(mapDBToModel);
  }

  async getNoteById(id) {
    // TODO Di dalamnya lakukan query untuk mendapatkan note di dalam database berdasarkan id yang diberikan.
    const query = {
      text: 'SELECT * FROM notes WHERE id=$1',
      values: [id],
    };
    const result = await this._pool.query(query);

    // TODO Kemudian periksa nilai result.rows, bila nilainya 0 (false) maka bangkitkan NotFoundError. Bila tidak, maka kembalikan dengan result.rows[0] yang sudah di-mapping dengan fungsi mapDBToModel.
    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return result.rows.map(mapDBToModel);
  }

  async editNoteById(id, { title, body, tags }) {
    const updatedAt = new Date().toISOString();

    // TODO lakukan query untuk mengubah note di dalam database berdasarkan id yang diberikan.
    const query = {
      text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, body, tags, updatedAt, id],
    };

    const result = await this._pool.query(query);

    // TODO periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError.
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
  }

  async deleteNoteById(id) {
    // TODO lakukan query untuk menghapus note di dalam database berdasarkan id yang diberikan.
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    // TODO periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError.
    if (result.rows.length) {
      throw new NotFoundError('Catatan gagal diubah. Id tidak ditemukan');
    }
  }
}

// TODO Sekarang fungsi CRUD pada NotesService sudah selesai. Jangan lupa ekspor NotesService agar dapat digunakan pada berkas JavaScript lain.

module.exports = NotesService;

/* Penting! Karena nilai createdAt dan updatedAt di database dituliskan dengan kolom created_at dan updated_at, maka objek notes yang dikembalikan akan memiliki struktur seperti ini:
{
  id: 'xxxx',
  title: 'xxxx',
  body: 'xxxx',
  tags: [],
  created_at: 'xxxx',
  updated_at: 'xxxx',
}

Ketidaksesuaian struktur ini tentu akan menimbulkan bugs serta kegagalan dalam pengujian nantinya. Sebelum mengembalikan notes, kita perlu menyesuaikan kembali strukturnya dengan cara mapping objek.

Kita akan buat fungsi mapping-nya pada berkas terpisah yah. Tujuannya untuk memudahkan dalam penggunaan ulang. Tinggalkan berkas NotesService.js sejenak dan silakan buat folder baru bernama utils di dalam berkas src. Kemudian di dalamnya kita buat berkas baru bernama index.js.
*/

