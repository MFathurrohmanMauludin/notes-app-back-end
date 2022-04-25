// untuk masalah routing akan disimpan di dalam routes.js
// TODO Hapi plugin notes ini akan bertanggung jawab untuk menangani setiap permintaan yang mengarah ke url /notes.
const routes = (handler) => [
  // TODO Untuk masing-masing properti handler, tentu perlu diubah nilainya karena kita tidak lagi menggunakan fungsi handler lama. Silakan ubah nilai properti pada masing-masing handler menjadi seperti ini (fokus terhadap kode yang diberi tanda tebal):
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
];

// TODO Dalam penetapan handler, ada dua hal yang berubah, yakni: 1. Menggunakan fungsi yang merupakan member dari objek handler (parameter). 2. Penamaan dari fungsi handler-nya.

// TODO PENTING: Perhatikan juga bahwa penggunaan kata plural dan singular perlu disesuaikan. Bila handler hanya menerima atau mengembalikan satu data (single), maka gunakan kata singular daripada plural (note daripada notes). Jika handler menerima atau mengembalikan banyak data, maka gunakan plural daripada singular (notes daripada note).

// TODO mengapa namanya perlu diubah? Alasannya tentu tak lain agar Anda lebih konsisten dalam memberikan nama fungsi handler. Mungkin saat ini belum begitu terasa karena masih segelintir fungsi yang dibuat. Namun, saat Anda telah membuat banyak fungsi dan proyek yang Anda buat sudah kompleks, tentu akan sulit untuk mencari fungsi bila tidak dinamai secara konsisten.

module.exports = routes;
