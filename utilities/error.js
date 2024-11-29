function error(status, msg) {
    var err = new Error(msg,'error');
    err.status = status;
    return err;
  }
  
  module.exports = error;
  