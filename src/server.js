/* mengimpor dotenv dan menjalankan konfigurasinya */
require('dotenv').config();


const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService'); // inMemory tidak lagi digunakan, sekarang menggunakan postgres
const NotesValidator = require('./validator/notes');

// TODO Lalu di dalam fungsi init, buat instance dari NotesService dengan nama notesService.
const init = async () => {
  const notesService = new NotesService();
  // TODO Karena nilai host dan port sudah disimpan pada environment variable, sekarang kita bisa ubah kode dalam mengonfigurasi server
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // TODO daftarkan plugin notes dengan options.service bernilai notesService menggunakan perintah await server.register tepat sebelum kode await server.start().
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
