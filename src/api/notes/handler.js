// Untuk request handling akan disimpan pada handler.js
const ClientError = require('../../exceptions/ClientError');

class NotesHandler {
  constructor(service, validator) {
    // TODO Kemudian, buat properti _service dan inisialisasikan nilainya dengan service dari parameter constructor. Penggunaan nama variabel diawali underscore (_) dipertimbangkan sebagai lingkup privat secara konvensi.
    this._service = service;
    this._validator = validator;

    // TODO binding setiap fungsi handler agar nilai this di dalam constructor tidak berubah menjadi nilai dari object handler lainnya
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  // TODO fungsi handler digunakan untuk menangani permintaan dari client yang datang kemudian memberikan respons dan sebaiknya memang hanya sebatas itu. karena kita sudah membuat NotesService, jadi proses pengelolaan seperti menyimpan, mendapatkan, mengubah, dan menghapus catatan tidak perlu lagi dilakukan pada request handler. Fungsi handler cukup memanggil fungsi publik dari NotesService melalui this._service.
  async postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const { title = 'untitled', body, tags } = request.payload;

      // TODO Karena fungsi this._service.addNote akan mengembalikan id catatan yang disimpan, maka buatlah variabel noteId untuk menampung nilainya. Ini karena nilai tersebut akan kita gunakan dalam merespons permintaan.
      const noteId = await this._service.addNote({ title, body, tags });
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getNotesHandler() {
    const notes = await this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  // TODO pertama-tama kita perlu dapatkan nilai id note yang dikirim client melalui path parameter. Jadi, tambahkan parameter request pada fungsi handler ini kemudian dapatkan nilai id dari request.params.
  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params; // path parameter
      const note = await this._service.getNoteById(id);// panggil fungsi this._service.getNoteById untuk mendapatkan objek note sesuai id yang diberikan client
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putNoteByIdHandler(request, h) {
    // TODO jangan lupa untuk menangani error yang dibangkitkan ketika note id yang diperbarui tidak ditemukan
    try {
      this._validator.validateNotePayload(request.payload);
      // TODO mendapatkan nilai id dari request.params yang digunakan pada path parameter sebagai id dari note.
      const { id } = request.params;
      const { title, body, tags } = request.payload;
      // TODO panggil fungsi this._service.editNoteById, kemudian masukkan id sebagai parameter pertama, dan request.payload yang akan menyediakan title, body, dan tags untuk objek note baru.
      await this._service.editNoteById(id, { title, body, tags });

      // TODO kita kembalikan response success dari handler ini seperti respons pada kode handler lama.

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) { // TODO menangani error yang dibangkitkan ketika note id yang diperbarui tidak ditemukan.
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;
    }
  }

  // TODO pertama kita dapatkan dulu nilai note id yang dikirim client melalui path parameter. Jadi, silakan tambahkan parameter request pada handler ini dan manfaatkan request.params untuk mendapatkan nilai id.
  async deleteNoteByIdHandler(request, h) {
    // TODO jangan lupa juga tambahkan penanganan error menggunakan try catch bila id note yang hendak dihapus tidak ditemukan.
    try {
      const { id } = request.params;

      // TODO panggil fungsi this._service.deleteNoteById, kemudian berikan nilai id sebagai parameter pemanggilan fungsinya.
      await this._service.deleteNoteById(id);

      // TODO kembalikan dengan respons sukses yang sama seperti pada kode handler lama.
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

// TODO jangan lupa untuk ekspor class NotesHandler agar dapat digunakan pada berkas JavaScript lain.
module.exports = NotesHandler;

/*
  Bila error merupakan turunan dari ClientError, maka kita bisa memberikan detail informasi terkait error apa yang terjadi kepada client melalui properti error.message dan error.statusCode.

  Namun bila bukan ClientError--itu berarti server error--maka secara default kita bisa merespons dengan pesan, “Maaf, terjadi kegagalan pada server kami” dan 500 sebagai nilai status codenya. Mungkin Anda akan mengerutkan dahi dan berkata, “Loh, mengapa pesannya tidak ambil dari error.message saja? Kan itu lebih menjelaskan errornya kepada client?”

  Benar sih pesannya akan lebih detail, tetapi pesan tersebut tidak akan berguna untuk client dan malah menimbulkan bahaya bila dalam pesan error tersebut mengandung informasi yang sensitif. Pesan yang dihasilkan server error bukan ditujukan untuk client, melainkan untuk kita sebagai developer. Tujuannya, agar kita dapat mengetahui penyebab terjadinya server error dan penanganannya menjadi lebih cepat.

  Maka dari itu, pada server error, kita bisa log error tersebut menggunakan console.error() sebelum mengembalikan response agar error yang terjadi bisa kita lihat pada Terminal proyek.
*/
