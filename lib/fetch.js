const https = require('https');

module.exports = function (url) {
  return new Promise(function (resolve, reject) {
    https.get(url, function (resp) {
      let data = '';

      resp.on('data', function (chunk) {
        data += chunk;
      });

      resp.on('end', function () {
        resolve(data);
      });
    }).on("error", reject);
  });
}
