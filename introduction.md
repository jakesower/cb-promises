# Promises

## Async in JavaScript

Async is one of the most challenging aspects of JavaScript for newcomers. Other languages, such as Java, Python, and many others, are synchronous by default. That means that actions that may take a long time, such as making an HTTP request, are allowed to run as long as it takes to get a result back. There is a clear advantage to doing things this way--it is easy to reason about these commands as part of a sequence of instructions. There is a cost, however, and that's the fact that the program is idling while the command is executing. This slows down the program. There are ways of mitigating this, such as multithreading, but it must either be worked around somehow, or the slowness must be accepted.

JavaScript is single threaded. It also runs in the browser, where users expect a responsive UI, even if HTTP requests are being made. A responsive UI and long running commands are at odds with each other, so JavaScript adopted an async model.

An analogy that works well for me is that the JavaScript runtime is much like a monarch sitting on a throne. Messengers approach with requests for the monarch. The monarch thinks on the changes, then dispatches zero or more messengers off to other places, such as to make an HTTP request, read from a database, or perform any number of tasks. When the tasks are completed, the messengers return to the queue before the monarch and are dealt with as before. This repeats indefinitely.

The cost of this is that code is more difficult to reason about than in a synchronous language. Over time, the language has come up with a few ways of dealing with this. Primarily: callbacks, event emitters, promises, and now async/await. (Other methods exist as well.)

## Callbacks vs Promises vs Async/Await

Each method of dealing with the async nature of JavaScript is equivalent at the end of the day. Therefore, it becomes largely a matter of preference in how to deal with it. I'll show an example of each, and then we can discuss their pros and cons. I'll then talk about why I like promises the best of the methods.

### Callbacks

```javascript
function cbExample() {
  const cb = function (err, response) {
    if (err) {
      console.error('something went wrong!');
      console.error(err);
    } else {
      console.log('everything went fine');
      console.log(response);
    }
  }

  const httpRequest = makeRequest('https://example.com/something', cb);
}
```

Callbacks are typically given as the last argument to async functions. In the above example `makeRequest` presumably sends an HTTP request, then invokes the callback at the conclusion with two arguments: an error if one if present, and a response if things went well. These arguments (`err` and `response`) are conventions used widely, but not guaranteed.

### Promises

```javascript
function promiseExample() {
  const httpRequestP = makeRequest('https://example.com/something);

  httpRequestP.then(function (response) {
    console.log('everything went fine');
    console.log(response);
  });

  httpRequestP.catch(function (err) {
    console.error('something went wrong!');
    console.error(err);
  });
}
```

Promises are a type of value that may be present at some time. The two paths of a promise, namely success and failure, are handled distinctly with `then` and `catch` respectively. The two can be chained together, as will be demonstrated later.

### Async/Await

```javascript
async function promiseExample() {
  try {
    const response = await makeRequest('https://example.com/something');
    console.log('everything went fine');
    console.log(response);
  } catch (err) {
    console.error('something went wrong!');
    console.error(err);
  }
}
```

The `makeRequest` function is implicitly `async` in the example. This code reads very much like syncrhonous code. The only difference is the `await` keyword. The standard `try/catch` error handling works with this form. An interesting thing about async/await is that it uses promises under the hood.

### Pros/Cons

#### Callbacks
Pros
1. The oldest method of dealing with async, these are nearly universally supported.

Cons
1. Very difficult to nest. This leads to the "Callback Hell" problem.
1. Difficult to trigger multiple effects with a single callback.

#### Promises
Pros
1. Can be treated as values.
1. Can be chained together easily. This makes them easier to read.

Cons
1. Not universally available from async libraries like callbacks are.
1. Not available before ES6, though polyfills are plentiful.
1. IDE support may be inferior.

#### Async/Await
Pros
1. Reads much like synchronous code, making it easy to follow.
1. Consice.
1. Can be mixed with synchronous code within the same `try/catch` block.
1. Solves the nested async issue better than the other two methods.

Cons
1. Since it uses promises internally, the lack of support in some libraries is the same as with promises.
1. Not widely supported, so it requires a compiler like babel.
1. Obscures the nature of the promises that it uses.

## Why Promises

Much ado has been made about "callback hell," and the evolution from callbacks to async/await has been successful in dealing with that. I choose to focus on promises for a few reasons:

1. They can be treated as values! That means they can be passed around and reasoned about like other values.
1. They are superior to callbacks for lexical purposes, such as with callback hell.
1. They can be chained together easily.
1. Async/Await uses them, so understanding them will prevent issues with async/await not behaving as expected.

Really, it's the first reason that is most important to me. The reason for this will become clear throughout the day.
