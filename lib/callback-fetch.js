const https = require('https');

module.exports = function (url, callback) {
  https.get(url, function (resp) {
    let data = '';

    resp.on('data', function (chunk) {
      data += chunk;
    });

    resp.on('end', function () {
      callback(null, data);
    });
  }).on("error", callback);
}
