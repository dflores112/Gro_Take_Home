class Response {
  constructor(status, success, message, data) {
    this.status = status;
    this.success = success;
    this.message = success === true ? 'Succesful lookup of'.concat(message) : 'Error finding '.concat(message);
    this.data = data;
    // this.headers = success === true ? 'Content-Type:application/JSON' : null;
  }
}
module.exports.Response = Response;
