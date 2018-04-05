const assertEqual = require('./lib/assert-equal');

/**
 * Exercise: Creating a promise.
 * Up to now, we've been using promises. Let's create one now.
 */

function executor(resolve, reject) {
  // code goes here
}

const myPromise = new Promise(executor);

/**
 * We see that Promises are created with the `new` keyword, meaning they are
 * JavaScript objects. We also see that the constructor takes in a single
 * argument--a binary function called the executor. The executor takes two
 * arguments, typically named `resolve` and `reject` that can be called to
 * either resolve or reject the promise. Calling either of these methods sets
 * the state (resolved/rejected) and the value.
 *
 * Some examples:
 */

function exploder(resolve, reject) {
  reject('boom!');
}
const exploderP = new Promise(exploder);

assertEqual(
  exploderP,
  Promise.reject('boom!')
);

// You'll typically see the executor defined anonymously directly when the
// promise is constructed.
const happyP = new Promise(function (resolve, reject) {
  resolve(':)');
});

assertEqual(
  happyP,
  Promise.resolve(':)')
);

/**
 * One feature of promises is that they can only be resolved or rejected once.
 */

const repetitiveP = new Promise(function (resolve, reject) {
  resolve(3);
  reject(4);
  resolve(5);
});

assertEqual(
  repetitiveP,
  Promise.resolve(3)
);
