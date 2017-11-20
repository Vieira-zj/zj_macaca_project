/**
 * Examples for library lodash.
 * Documents: https://lodash.com/docs/
 * 
 */
const _ = require('lodash');

// String
let stringDemos = function () {
  console.log(_.camelCase('hello world'));
  console.log(_.capitalize('FRED'));
  console.log(_.startsWith('abc', 'a'));
  console.log(_.endsWith('abc', 'c'));
  console.log(_.replace('Hi Fred', 'Fred', 'Barney'));
  console.log(_.map(['6', '08', '10'], _.parseInt));
  console.log(_.trim('  test '));
  console.log(_.words('fred, barney, & pebbles'));
}

// Number
let numberDemos = function () {
  console.log(_.random(0, 5));
}

// Array
let arrayDemos = function () {
  let tmpArr1 = [1];
  console.log(_.concat(tmpArr1, 2, [3]));

  let users = [{
      'user': 'barney',
      'active': false
    },
    {
      'user': 'fred',
      'active': false
    },
    {
      'user': 'pebbles',
      'active': true
    }
  ];
  console.log(_.findIndex(users, {
    'user': 'fred',
    'active': false
  }));

  let tmpArr2 = [1, 2, 3, 4];
  let evens = _.remove(tmpArr2, n => {
    return n % 2 === 0;
  });
  console.log(evens);
  console.log(tmpArr2); // src array changed

  let tmpArr3 = [1, 2, 3];
  console.log(_.reverse(tmpArr3));
  console.log(tmpArr3); // src array changed

  console.log(_.fill(Array(3), 2));
  console.log(_.join(['a', 'b', 'c'], '~'));
  console.log(_.uniq([2, 1, 2]));

  let zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
  console.log(zipped);
  console.log(_.unzip(zipped));
}

// Collection
let collectionDemos = function () {
  // TODO
}


if (require.main === module) {
  // stringDemos();
  // numberDemos();
  // arrayDemos();
}