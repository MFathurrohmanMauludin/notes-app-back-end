/* eslint-disable camelcase */

exports.shorthands = undefined; // TODO Untuk kode ini, Anda bisa menghapusnya karena tidak digunakan.

// TODO Singkatnya, pada fungsi exports.up kita menuliskan kode untuk membuat tabel notes menggunakan pgm (pg-node-migrate).

// pgm.createTable(nama tabel, struktur tabel);
exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    tags: {
      type: 'TEXT[]',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

// TODO Lanjut ke fungsi exports.down, di fungsi ini kita tuliskan aksi negasi dari yang kita lakukan di fungsi up. Yakni menghapus tabel notes.

exports.down = (pgm) => {
  pgm.dropTable('notes');
};

// TODO Bila Anda mendapatkan pesan “Migrations complete!”, Itu berarti migrations berhasil dijalankan. Dengan begitu kita berhasil membuat tabel notes di dalam database notesapp. Hooray!
