const https = require('https');

/**
 * Reading the contents of this file will spoil the callback-wrapper challenge,
 * so please don't look until you've completed that.
 */

















































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
