const assertEqual = require('../lib/assert-equal');
const { fetchWeather, fetchTwins } = require('../lib/fetchers');

/**
 * This is an actual implementation of Promise.all. It must handle both success
 * and failure cases. If one or more promises fail, the entire promise fails.
 * The contents of the rejected promise are the same as the contents of the
 * first promise that rejected.
 */

function promiseAll(promises) {
  let resolved = [];
  let remaining = promises.length;

  function resolvePromise(prom, resolve, reject, idx) {
    prom.then(function (val) {
      resolved[idx] = val;
      remaining = remaining - 1;
      if (remaining === 0) {
        resolve(resolved);
      }
    });
    prom.catch(reject);
  }

  return new Promise(function(resolve, reject) {
    promises.forEach((prom, idx) =>
      resolvePromise(prom, resolve, reject, idx)
    );
  });
}

assertEqual(
  promiseAll([Promise.resolve(1), Promise.resolve(2)]),
  Promise.resolve([1, 2]),
  'Promise All 1'
);

// The following code is an excellent of example of how promises behave like
// values.
const cities = ["Reston, VA", "Washington, DC", "Santa Cruz, CA"];
const weatherPs = cities.map(fetchWeather);

assertEqual(
  promiseAll(weatherPs),
  Promise.resolve([53, 40, 54]),
  'Promise All 2'
);

const bomb = Promise.reject('x_x');
const babomb = Promise.reject('^__^');
const bombArray = weatherPs.concat([bomb]);

assertEqual(
  promiseAll(bombArray),
  Promise.reject('x_x'),
  'Promise All 3'
);

assertEqual(
  promiseAll([babomb, bomb]),
  Promise.reject('^__^'),
  'Promise All 4'
);

assertEqual(
  promiseAll([Promise.resolve('hi'), bomb]),
  Promise.reject('x_x'),
  'Promise All 5'
);
