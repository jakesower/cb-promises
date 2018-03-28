const assertEqual = require('./lib/assert-equal');

/**
 * Sometimes code running inside a promise breaks. Or sometimes a URL can't be
 * reached. In synchronous code, errors would be thrown and caught. In the
 * world of promises, promises are rejected.
 *
 * A promise is rejected either when explicitly rejected within the promise
 * definition itself, via the Promise.reject method or any time an error is
 * thrown.
 */

function boom() {
  throw new Error('Kapow!');
}

assertEqual(
  Promise.resolve().then(boom),
  Promise.reject(new Error ('Kapow!'))
);
