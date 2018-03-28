const assertEqual = require('./lib/assert-equal');
const { fetchWeather, fetchTwins } = require('./lib/fetchers');

/**
 * This is an optimistic implementation of the Promise.all function. It's
 * optimistic because it doesn't take into account errors. The goal is to take
 * an array of promises, and combine them into a single promise that resolves
 * to an array of the results of the original promises. Example:
 *
 */

assertEqual(
  Promise.all([Promise.resolve(1), Promise.resolve(2)]),
  Promise.resolve([1, 2])
);

function promiseAll(promises) {
  let remaining = promises.length;
  let resolved = [];

  return new Promise(function (resolve) {
    promises.forEach(function (prom, idx) {
      prom.then(function (val) {
        // This makes use of two closures: the top remaining/resolved and the
        // idx within the forEach above.
        resolved[idx] = val;
        remaining = remaining - 1;
        if (remaining === 0) {
          resolve(resolved);
        }
      });
    });
  });
}

assertEqual(
  promiseAll([Promise.resolve(1), Promise.resolve(2)]),
  Promise.resolve([1, 2])
);

// The following code is an excellent of example of how promises behave like
// values.
const cities = ["Reston, VA", "Washington, DC", "Santa Cruz, CA"];
const weatherPs = cities.map(fetchWeather);

assertEqual(
  promiseAll(weatherPs),
  Promise.resolve([53, 40, 54])
);
