const assertEqual = require('./lib/assert-equal');
const { fetchWeather } = require('./lib/fetchers');

/**
 * Example 1: Simple Usage
 *
 * Pull up some cities to play with. Please pay attention to the labels by the
 * check marks in the output when you run the program.
 *
 * Important Note: There will only be one HTTP request for each city. The
 * resulting values get used over and over.
 */
const herndonP = fetchWeather('Herndon, VA, USA');
const restonP = fetchWeather('Reston, VA, USA');
const slcP = fetchWeather('Salt Lake City, UT, USA');
const ogdenP = fetchWeather('Ogden, UT, USA');

assertEqual(herndonP, Promise.resolve(85), 'Herndon Temp');
assertEqual(restonP, Promise.resolve(62), 'Reston Temp');
assertEqual(slcP, Promise.resolve(43), 'Salt Lake Temp');
assertEqual(ogdenP, Promise.resolve(58), 'Ogden Temp');


/**
 * Example 2: Multiple Promises
 *
 * Let's compare the temperatures between two cities.
 */
const hotter = (t1, t2) => (t1 > t2) ? t1 : t2;

const hotterLocalCityP = Promise.all([herndonP, restonP])
  .then(([herndon, reston]) => hotter(herndon, reston));

assertEqual(hotterLocalCityP, herndonP, 'Hotter Local');

/**
 * Example 3: Generalized Hotter
 *
 * Generalize the previous to be a function that takes two city promises.
 */

const hotterPair = ([t1, t2]) => hotter(t1, t2);

function hotterCityP(cityP1, cityP2) {
  return Promise.all([cityP1, cityP2]).then(hotterPair);
}

assertEqual(hotterCityP(herndonP, restonP), herndonP, 'Herndon v Reston');
assertEqual(hotterCityP(slcP, restonP), restonP, 'SLC v Reston');

/**
 * Example 4: Average Temperatures
 *
 * Manipulate a couple of pairs of promises. Note the difficulties we run into
 * when working with an object of promises.
 */

const regions = {
  utah: [slcP, ogdenP],
  virginia: [restonP, herndonP]
};

const sum = list => list.reduce((x, y) => x + y);
const average = list => sum(list) / list.length;

const averageRegionsPs = {
  utah: Promise.all(regions.utah).then(average),
  virginia: Promise.all(regions.virginia).then(average)
};

assertEqual(
  averageRegionsPs.utah,
  Promise.resolve(50.5),
  'Average Regions: Utah'
);

assertEqual(
  averageRegionsPs.virginia,
  Promise.resolve(73.5),
  'Average Regions: Virginia'
);

/**
 * Example 5: Object Promise
 *
 * Create a function that makes working with promise objects easier. Note that
 * this is a package that can be installed with:
 *
 * `npm install object-promise`
 *
 * The function works like `Promise.all`, but it gets applied to an object that
 * has values that are promises. It runs all of them at the same time and
 * returns a single object with all of the values resolved.
 */

function objectPromise(obj) {
  const keys = Object.keys(obj);
  const vals = keys.map(k => obj[k]);
  const rekey = newVals => keys.reduce(
    function (newObj, k, idx) {
      return Object.assign({}, newObj, {[k]: vals[idx]});
    },
    {}
  );

  return Promise.all(vals).then(rekey);
}

assertEqual(
  objectPromise(averageRegionsPs),
  Promise.resolve({
    utah: 50.5,
    virginia: 73.5
  }),
  'Object Promise'
);
