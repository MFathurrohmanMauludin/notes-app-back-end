const ClientError = require('./ClientError');

// TODO Buat class dengan nama InvariantError yang mewarisi class ClientError dan buat constructor yang menerima satu parameter bernama message.
class InvariantError extends ClientError {
  // TODO Di dalam constructor, panggil fungsi super dengan membawa nilai message dan tetapkan this.name dengan nilai “InvariantError”.
  constructor(message) {
    // TODO Karena ClientError memiliki status code 400, maka kita tidak perlu menetapkan status code di sini. Sebab secara default, turunan ClientError akan mewariskan nilai status code 400 kepada InvariantError.
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
