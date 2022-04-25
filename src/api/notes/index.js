// untuk pluginnya sendiri akan disimpan pada index.js
const NotesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  // TODO Beri properti name dengan notes, properti version dengan nilai ‘1.0.0’, dan fungsi register dengan fungsi yang memiliki dua parameter. Dua parameter fungsi ini adalah server dan objek options yang menampung service.
  register: async (server, { service, validator }) => {
    // TODO di dalam fungsi register, buatlah instance dari class NotesHandler dengan nama notesHandler. Kemudian nilai service sebagai pada constructor-nya. Jangan lupa untuk impor berkas handler.js agar NotesHandler dapat digunakan.
    const notesHandler = new NotesHandler(service, validator);

    // TODO daftarkan routes yang sudah kita buat pada server Hapi. Nah, caranya di dalam method server.route, panggil fungsi routes dan berikan notesHandler sebagai nilai handler-nya.
    server.route(routes(notesHandler));
  },
};
