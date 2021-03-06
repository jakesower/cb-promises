//                                              ____
//  ___                                      .-~    '.
// `-._~-.                                  / /  ~@\   )
//      \  \                               | /  \~\.  `\
//      ]  |                              /  |  |< ~\(..)
//     /   !                        _.--~T   \  \<   .,,
//    /   /                 ____.--~ .    _  /~\ \< /         -- GOOD LUCK!
//   /   /             .-~~'        /|   /o\ /-~\ \_|
//  /   /             /     )      |o|  / /|o/_   '--'
// /   /           .-'(     l__   _j \_/ / /\|~    .
// /    l          /    \       ~~~|    `/ / / \.__/l_
// |     \     _.-'      ~-\__     l      /_/~-.___.--~
// |      ~---~           /   ~~'---\_    __[o,
// l  .                _.    ___     _>-/~
// \  \     .      .-~   .-~   ~>--'  /
//  \  ~---'            /         _.-'
//   '-.,_____.,_  _.--~\     _.-~
//               ~~     (   _}
//                      `. ~(
//                        )  \
//                  /,`--'~\--'~\
//                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const assertEqual = require('../lib/assert-equal');

/**
 * Final Challenges: Composition and Middleware
 *
 * This is a very difficult challenge set that will exercise all of your
 * knowledge from the course. It is unlikely that you will need this depth of
 * understanding, but if you're up for it, give them a shot!
 */

/**
 * Challenge 1: Function Composition
 *
 * Function composition is the heart of all types of programming, but the
 * functional style makes it much more explicit.
 *
 * Function composition is a simple idea. If there are two functions, f and g,
 * such that:
 *
 * f(x) = y
 * g(y) = z
 *
 * Then I can make a function h(x) = z by composing the two. This is indicated
 * mathematically like so:
 *
 * (g ∘ f)(x)
 *
 * In JavaScript, it is written like this:
 *
 * function h(x) {
 *   return g(f(x));
 * }
 *
 * Composition let's us make more complicated functions out of simple ones.
 * Consider the case where I want to get the names of everyone who likes beets.
 *
 * people = [
 *  { name: 'Brett', likes: ['apples', 'bananas'] },
 *  { name: 'Yousef', likes: ['beets'] },
 *  { name: 'Williana', likes: ['cherries', 'beets'] }
 * ];
 *
 * It's easy enough to pick out the people who like beets:
 * function likesBeets(person) {
 *   return person.likes.includes('beets');
 * }
 *
 * const beetLikers = filter(people, likesBeets);
 *
 * It's also easy to get the name of each person:
 * function getName(person) {
 *   return person.name;
 * }
 *
 * const names = map(people, getName);
 *
 * Composing them is straightforward:
 * map(filter(people, likesBeets), getName);
 *
 * Put another way:
 * const getNames = people => map(people, getName);
 * const getBeetLikers = people => filter(people, likesBeets);
 *
 * getNames(getBeetLikers(people));
 *
 * That representation is straightforward, but the more functions that get
 * composed, the longer the code will be, which will lead to code that is
 * difficult to read and understand. What we need is `compose`.
 *
 * const getNamesOfBeetLikers = compose([getNames, getBeetLikers]);
 * getNamesOfBeetLikers(people); // [ 'Yousef', 'Williana' ]
 *
 */

// utils

function isString(s) {
  return typeof s === 'string';
}

const id = x => x;  // the identity function, this may come in handy. ;)

function composePair(g, f) {
  return val => g(f(val));
}

function compose(funcs) {

}


// Testing apparatus
const people = [
  { name: 'Brett', likes: ['apples', 'bananas'] },
  { name: 'Yousef', likes: ['beets'] },
  { name: 'Williana', likes: ['cherries', 'beets'] }
];

function likesBeets(person) {
  return person.likes.includes('beets');
}

const beetLikers = people.filter(likesBeets);

function getName(person) {
  return person.name;
}

const names = people.map(getName);

people.filter(likesBeets).map(getName);

const getNames = people => people.map(getName);
const getBeetLikers = people => people.filter(likesBeets);

assertEqual(
  getNames(getBeetLikers(people)),
  ['Yousef', 'Williana']
);

const getNamesOfBeetLikers = compose([getNames, getBeetLikers]);

assertEqual(
  getNamesOfBeetLikers(people),
  ['Yousef', 'Williana']
);

const transforms = [
  x => x + 1,
  x => x * 4,
  x => x / 2,
  x => x + 6
];

assertEqual(
  compose(transforms)(10),
  33,
  'Compose'
);


/**
 * Challenge 2: Pipe
 *
 * Some people prefer to compose their functions from left to right rather than
 * right to left. Implement a function that does this.
 */

function pipe(funcs) {

}

assertEqual(
  pipe(transforms)(10),
  28,
  'Pipe'
);


/**
 * Challenge 3: Middleware
 *
 * Middleware is a more flexible way of composing functions together. It has
 * many uses, which will be explored in the test cases.
 *
 * I've included an assortment of them below. The thing they have in common is
 * their signature: they all take some argument called `req` and a `next`
 * function. `req` can be anything (it stands for "request"). `next` is a
 * function that invokes the next layer. Hopefully the test cases will make it
 * clear what's going on.
 *
 * HINT: Disabling the error catching middleware can make bugs easier to spot.
 * HINT: Disabling the logify middleware can clean up the test output without
 *       changing the validity of the tests.
 */

// logs both the request and the response
function logify(req, next) {
  console.log('calling function');
  console.log(req)
  const res = next(req);
  console.log('got result');
  console.log(res);
  return res;
}

// takes a JS object, checks for a valid auth token (we fake this part) and
// only calls the next layer if the user is authorized
function authorize(req, next) {
  if (req.cookies && req.cookies.authToken && req.cookies.authToken === 'okay') {
    return next(req);
  }

  return {
    status: 403,
    body: JSON.stringify("user not authorized!")
  };
}

// puts the result of a request into an HTTP style format
function formatResponse(req, next) {
  const res = next(req);
  if (res.status && res.body) { return res; }
  if (isString(res)) {
    return {
      status: '200',
      body: res.body,
    };
  }
  return {
    status: '200',
    body: JSON.stringify(res),
  };
}

// returns a 500 if anything in an inner layer throws
function errorCatcher(req, next) {
  const err500 = {
    status: '500',
    body: '🙀',
  };

  try {
    return next(req);
  } catch (ignore) {
    return err500;
  }
}

// okay, we've got some middleware functions; now to assemble them

// take a list of middleware functions and return a new function that accepts
// one argument: a function to run inside the middleware; this should return a
// function that takes the initial value of `req`. each function in the
// middleware stack should be called, followed by the wrapped function.
function makeMiddleware(mwFuncs) {

}


// obviously fake
function findUser(req) {
  if (req.userId) {
    return { id: req.userId, name: "Jules" };
  }

  return "user not found!";
}

function buggyAction(req) {
  throw 'oops';
}


// wrapping the tests in an IIFE to avoid naming conflicts later
(function () {
  const authorizedStack = makeMiddleware([
    logify,
    errorCatcher,
    formatResponse,
    authorize
  ]);

  const publicStack = makeMiddleware([
    logify,
    errorCatcher,
    formatResponse
  ]);

  const res = authorizedStack(findUser)({ userId: 3 });
  assertEqual(
    res,
    { status: 403, body: JSON.stringify("user not authorized!") },
    'Middleware 1'
  );

  const res2 = authorizedStack(findUser)({ cookies: { authToken: 'okay' }, userId: 3 });
  assertEqual(
    res2,
    { status: '200', body: JSON.stringify({ id: 3, name: "Jules" }) },
    'Middleware 2'
  );

  const res3 = authorizedStack(buggyAction)({ userId: 3 });
  assertEqual(
    res3,
    { status: 403, body: JSON.stringify("user not authorized!") },
    'Middleware 3'
  );

  const res4 = authorizedStack(buggyAction)({ cookies: { authToken: 'okay' }, userId: 3 });
  assertEqual(
    res4,
    { status: '500', body: '🙀' },
    'Middleware 4'
  );

  const res5 = publicStack(findUser)({ userId: 3 });
  assertEqual(
    res5,
    { status: '200', body: JSON.stringify({ id: 3, name: "Jules" }) },
    'Middleware 5'
  );

}());

/**
 * Challenge 4: Promise-Aware Middleware
 *
 * The final incarnation of the middleware pattern uses promises at each step.
 * `req` and `next` are the same, except that each call to next must return a
 * promise, even if the middleware function doesn't do that normally. Good
 * luck! :)
 */

function logifyAsync(req, next) {
  console.log('calling function');
  console.log(req);
  return next(req).then(function (res) {
    console.log('got result');
    console.log(res);
    return res;
  });
}


// puts the result of a request into an HTTP style format
function formatResponseAsync(req, next) {
  return next(req).then(function (res) {
    if (res.status && res.body) { return res; }
    if (isString(res)) {
      return {
        status: '200',
        body: res.body,
      };
    }
    return {
      status: '200',
      body: JSON.stringify(res),
    };
  });
}

function errorCatcherAsync(req, next) {
  const err500 = {
    status: '500',
    body: '🙀',
  };

  try {
    const res = next(req);
    return res.catch((err) => {
      return err500;
    });
  } catch (ignore) {
    return err500;
  }
}

function findUserAsync(req) {
  return Promise.resolve(findUser(req));
}

function buggyAction(req) {
  throw 'oops';
}


function makeAsyncMiddleware(mwFuncs) {

}


(function () {
  const authorizedStack = makeAsyncMiddleware([
    logifyAsync,
    errorCatcherAsync,
    formatResponseAsync,
    authorize, // note that the sync version works fine
  ]);

  const publicStack = makeAsyncMiddleware([
    logifyAsync,
    errorCatcherAsync,
    formatResponseAsync,
  ]);

  const res = authorizedStack(findUserAsync)({ userId: 3 });
  assertEqual(
    res,
    Promise.resolve({ status: 403, body: JSON.stringify("user not authorized!") }),
    'Async Middleware 1'
  );

  const res2 = authorizedStack(findUserAsync)({ cookies: { authToken: 'okay' }, userId: 3 });
  assertEqual(
    res2,
    Promise.resolve({ status: '200', body: JSON.stringify({ id: 3, name: "Jules" }) }),
    'Async Middleware 2'
  );

  const res3 = authorizedStack(buggyAction)({ userId: 3 });
  assertEqual(
    res3,
    Promise.resolve({ status: 403, body: JSON.stringify("user not authorized!") }),
    'Async Middleware 3'
  );

  const res4 = authorizedStack(buggyAction)({ cookies: { authToken: 'okay' }, userId: 3 });
  assertEqual(
    res4,
    Promise.resolve({ status: '500', body: '🙀' }),
    'Async Middleware 4'
  );

  const res5 = publicStack(findUserAsync)({ userId: 3 });
  assertEqual(
    res5,
    Promise.resolve({ status: '200', body: JSON.stringify({ id: 3, name: "Jules" }) }),
    'Async Middleware 5'
  );

  // this one wraps a synchronous function
  const res6 = authorizedStack(findUser)({ cookies: { authToken: 'okay' }, userId: 3 });
  assertEqual(
    res2,
    Promise.resolve({ status: '200', body: JSON.stringify({ id: 3, name: "Jules" }) }),
    'Async Middleware 6'
  );
}());
