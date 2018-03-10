/**
 * Asnyc functions to sync.
 * http://www.cnblogs.com/cpselvis/p/6344122.html
 * 
 */

const asyncByCallback1 = function () {
  setTimeout(function () {
    console.log('sleep 3000 ms');
    setTimeout(function () {
      console.log('sleep 2000 ms');
      setTimeout(function () {
        console.log('sleep 1000 ms');
      }, 1000);
    }, 2000);
  }, 3000);
}

const asyncByCallback2 = function () {
  let asyncFn = function (wait) {
    if (wait < 1000) {
      console.warn('wait time less than 1000ms!');
      return;
    }

    setTimeout(function () {
      console.log(`sleep ${wait} ms`);
      asyncFn(wait - 1000);
    }, wait);
  };

  asyncFn(3000);
};

const asyncByPromise = function () {
  let asyncFn = function (wait) {
    return new Promise(function (resolve, reject) {
      if (wait < 1000) {
        reject('wait time less than 1000ms!');
      }

      setTimeout(function () {
        console.log(`sleep ${wait} ms`);
        resolve(wait - 1000);
      }, wait);
    });
  };

  asyncFn(3000)
    .then(asyncFn)
    .then(asyncFn)
    .then(asyncFn)
    .catch(reason => console.warn(reason)); // end with catch block
};

/* jshint ignore:start */
const asyncByAwait = function () {
  let asyncFn = function (wait) {
    return new Promise(function (resolve, reject) {
      if (wait < 1000) {
        reject('wait time less than 1000ms!'); // throws error
      }

      setTimeout(function () {
        console.log(`sleep ${wait} ms`);
        resolve(wait - 1000);
      }, wait);
    });
  };

  async function asyncTest() {
    try {
      // functions invoked in try catch block
      let timeout = await asyncFn(3000);
      timeout = await asyncFn(timeout);
      timeout = await asyncFn(timeout);
      timeout = await asyncFn(timeout);
      console.log('timeout after execution:', timeout);
    } catch (err) {
      console.warn(err);
    }
  }

  asyncTest();
};
/* jshint ignore:end */

if (require.main === module) {
  // asyncByCallback1();
  // asyncByCallback2();

  // asyncByPromise();

  asyncByAwait();

  console.log('async functions test.');
}