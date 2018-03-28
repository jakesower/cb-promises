const assertEqual = require('./lib/assert-equal');
const fetch = require('./lib/fetch');

/**
 * Promise Basics
 *
 * This goes over basic usage and patterns for promises. First, we'll cover
 * usage. After there's a firm understanding of that, we'll move on to defining
 * them. Let's start with a brief example, then pick it apart to understand
 * what's going on.
 */

/**
 * Example 1: A weather service
 */

const webRoot = 'https://7lvxk1opef.execute-api.us-east-1.amazonaws.com/dev';

// This will go out to a lambda I've written to retrieve weather data. It uses
// fake data, but means that we don't need to get API keys and such from a real
// weather provider.
function getWeather(location) {
  return fetch(`${webRoot}/weather?location=${location}`);
}

function extractTemperature(response) {
  return JSON.parse(response).temperature;
}

// Let's run this just to see what happens
const restonTemperature = getWeather('Reston').then(extractTemperature);

// Test extractTemperature function on the response
assertEqual(
  restonTemperature,
  Promise.resolve(66)
);

/**
 * A few things happened here:
 * - The `getWeather` function was called with "Reston" as its only argument.
 * - This called the `fetch` method with a URL, which returned a promise.
 * - The `then` method was called on the promise and passed the
 *   `extractTemperature` function as its only argument, which returned a new
 *   promise
 * - `assertEqual` was called to compare the result with a promise containing
 *   66.
 * - The two were considered equal.
 *
 * A few observations:
 * - Promises can be created from regular values by calling Promise.resolve,
 *   e.g., Promise.resolve(66). This is similar to the way a list can be
 *   created from a regular value. In that case it would be 66 -> [66].
 * - The then method on promises take in a unary function that acts on the
 *   contents of the promise when the promise is ready.
 * - Calling the function `extractTemperature`, which takes in a string and
 *   returns a number, resulted in returning a promise of a number, rather than
 *   just the number itself, when called in the context of `then`.
 * - The `then` method has two all important qualities.
 *
 *   1. It is the ONLY way of accessing the value contained within the promise
 *      (unless the promise is rejected, but let's ignore that for now)
 *   2. Once a value is in the promise context, it can never escape.
 *
 * Let that second point sink in because it is a core quality of async, one
 * cannot be avoided or ignored. Once you have a promise, you're stuck with it.
 * This is due to the fact that the initial async nature of the promise means
 * that anything that depends on it MUST be async as well.
 *
 * Seriously, let that point sink it.
 *
 * So how are promises useful? The key observation is that we can do anything
 * we want within the function we pass to `then`. `assertEqual` in the above
 * example had to deal with the async quality of the promise, but it managed to
 * output the checkmark saying the test passed. Likewise, HTTP responses can be
 * send when using promises on the server. Likewise, DOM updates can be made
 * within a function that gets passed to `then`.
 *
 * Also, we are not doomed to dealing with the async contagion when we write
 * our code. `extractTemperature` in the above example has no notion of
 * promises, but manages to operate on one anyway.
 *
 * These are the observations that need to underpin decisions when writing code
 * that uses promises or any other kind of async.
 *
 * To recap:
 *
 * 1. Async is contagious. Any code that depends on a promise will either need
 *    to operate on the promise as an async entity, or within a call to its
 *    `then` method.
 * 2. Side effects and any other number of useful other things can be done
 *    within a function passed to `then`.
 */


/**
 * Example 2: Features of Promises
 */

function noisyFive() {
  console.log("Gonna return a 5.");
  return 5;
}

const noisyPromise = Promise.resolve(noisyFive());

noisyPromise.then(console.log);
noisyPromise.then(console.log);

/**
 * A few qualities to note from the above example:
 *
 * - The `noisyFive` function is only run once (as seen by the fact that the
 *   `console.log` call is only run once).
 * - There are multiple subscribers to the same promise.
 *
 * This should look somewhat familiar. The `singularPubsub` function from the
 * pubsub challenge exhibited very similar behavior. In fact, promises behave
 * almost exactly like `singularPubsub` with a couple of exceptions: there's a
 * quality of async to them and promises can have a "failed" state, which will
 * be covered later.
 */

