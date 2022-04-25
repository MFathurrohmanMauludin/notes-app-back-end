const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404); // TODO panggil fungsi super dengan membawa nilai message dan 404 sebagai statusCode
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
