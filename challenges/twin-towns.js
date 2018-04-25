const assertEqual = require('../lib/assert-equal');
const { fetchWeather, fetchTwins } = require('../lib/fetchers');

/**
 * Twin Towns, also known as Sister Cities, are agreements between cities
 * around the world used to promote cultural and economic ties. You can learn
 * more here: https://en.wikipedia.org/wiki/Sister_city
 *
 * For this module, we'll use twin towns as a lens for understanding promises.
 */

/**
 * Example 1: Usage of APIs
 * The module uses two lambdas to provide data for the exercises. Please feel
 * free to explore the URLs:
 *
 * Weather: https://l5q8d1uj4m.execute-api.us-east-1.amazonaws.com/dev/weather?location=<location>
 * Twin Towns: https://l5q8d1uj4m.execute-api.us-east-1.amazonaws.com/dev/twins?city=<city>
 */

assertEqual(
  fetchWeather('Salt Lake City, Utah, USA'),
  Promise.resolve(36),
  'Fetch Weather'
);
assertEqual(
  fetchTwins('Dull, Scotland'),
  Promise.resolve([
    'Dull, Scotland',
    'Boring, Oregon, USA',
    'Bland, Australia',
  ]),
  'Fetch Twins'
);

/**
 * Example 2: Promise.all
 *
 * Promise.all is a function that takes in an array of promises and return a
 * promise of an array containing the values of the completed promises.
 */

function twoCities(city1, city2) {
  // These requests will occur simultaneously.
  const weather1P = fetchWeather(city1);
  const weather2P = fetchWeather(city2);

  return Promise.all([weather1P, weather2P]);
}

assertEqual(
  twoCities('Reston, Virginia, USA', 'Taipei, Taiwan'),
  Promise.resolve([76, 63]),
  'Two Cities'
);



/**
 * Challenge: Coldest Twin
 * Given a city, find its twin cities using `fetchTwins`, then return the name
 * of the city that is the coldest according to `fetchWeather`.
 */

function coldestTwin(city) {

}

assertEqual(
  coldestTwin('Washington, DC, USA'),
  Promise.resolve('Darak, Senegal'),
  'Coldest Twin 1'
);

assertEqual(
  coldestTwin('Tabriz, Iran'),
  Promise.resolve('Oruro, Bolivia'),
  'Coldest Twin 2'
);
