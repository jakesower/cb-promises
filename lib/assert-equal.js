/**
 * This is the testing apparatus for all the other files. Feel free to read and
 * understand, but it's really not important.
 */

function isEqual(actual, expected) {
  if (actual === null ^ expected === null) { return false; }
  else if (Array.isArray(actual)) {
    if (actual.length !== expected.length) { return false; }
    return actual.every((_, i) => isEqual(actual[i], expected[i]));
  } else if (actual !== null && typeof actual === 'object') {
    const aKeys = Object.keys(actual);
    const eKeys = Object.keys(expected);
    if (aKeys.length !== eKeys.length) { return false; }
    return aKeys.every(k => isEqual(actual[k], expected[k]));
  } else {
    return (actual === expected);
  }
  return true;
}

function assertEqual(actual, expected, label = '') {
  function boom() {
    if (label !== '') { console.log('for ' + label); }
    console.log(actual);
    console.log('does not equal');
    console.log(expected);
  }

  if (actual instanceof Promise && expected instanceof Promise) {
    Promise.all([actual, expected])
      .then(([a, e]) => assertEqual(a, e))
      .catch(() => {
        actual.then(boom).catch(() => {}); // e rejected, a didn't
        expected.then(boom).catch(() => {}); // vice versa
        actual.catch(a => expected.catch(e => assertEqual(a, e)));
      });
  } else if (actual instanceof Promise || expected instanceof Promise) {
    boom();
  } else {
    isEqual(actual, expected) ? console.log('✓ ' + label) : boom();
  }
}

module.exports = assertEqual;
