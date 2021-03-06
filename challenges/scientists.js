const assertEqual = require('../lib/assert-equal');
const { fetchScientist } = require('../lib/fetchers');

/**
 * Challenge 1: Get Friend
 *
 * Get the name of a scientist, find their friend and return the full name of
 * the friend. Here's an example of what a scientist looks like:
 *
 * `fetchScientist` takes a name, e.g., 'Liskov' and returns a promise of a
 * scientist (as defined above).
 *
 * Example: fetchScientist('Liskov') -> Promise.resolve({
 *   name: 'Liskov',
 *   fullName: 'Barbara Liskov',
 *   dob: new Date('1939-11-07'),
 *   friend: 'Eich',
 * })
 */

function getFriend(name) {

}

assertEqual(
  getFriend('Liskov'),
  Promise.resolve('Brenden Eich'),
  'Get Friend'
);


/**
 * Challenge 2: Compare Ages
 *
 * Get the name of a scientist, find their friend and return the full name of
 * the one who is older. Here's an example of what a scientist looks like:
 */

function compareAges(name) {

}

assertEqual(
  compareAges('Eich'),
  Promise.resolve('Barbara Liskov'),
  'Compare Ages'
);


/**
 * Challenge 3: Compare Ages with Errors
 *
 * Implement the above challenge again, but this time it must handle the case
 * of scientists without friends. In the case that a scientist does not have a
 * friend, the full name of the original scientist should be returned.
 */

function compareAgesWithErrors(name) {

}

assertEqual(
  compareAgesWithErrors('Eich'),
  Promise.resolve('Barbara Liskov'),
  'Compare Ages with Errors 1'
);

assertEqual(
  compareAgesWithErrors('Turing'),
  Promise.resolve('Alan Turing'),
  'Compare Ages with Errors 2'
);
