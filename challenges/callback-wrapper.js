const assertEqual = require('../lib/assert-equal');
const callbackFetch = require('../lib/callback-fetch');

const webRoot = 'https://l5q8d1uj4m.execute-api.us-east-1.amazonaws.com/dev';

/**
 * Challenge: Wrapping a Callback
 * `callbackFetch` is a function that operates like the `fetch` function used
 * elsewhere. The difference is that instead of returning a promise, it takes a
 * callback. Depending out the outcome, the callback is called as so:
 *
 * Success: callback(null, result)
 * Failure: callback(err)
 *
 * The goal of the challenge is to create a function that wraps
 * `callbackFetch` and returns a promise that resolves or rejects correctly.
 */

function wrapCallback(url) {

}

assertEqual(
  wrapCallback(`${webRoot}/weather?location=Munich, Germany`),
  Promise.resolve('{"temperature":62}'),
  'Callback Wrapper 1'
);

assertEqual(
  wrapCallback(`example.com/lol`).catch(() => Promise.reject('something happened')),
  Promise.reject('something happened'),
  'Callback Wrapper 2'
);
