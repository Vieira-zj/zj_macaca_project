/**
 * Baseline test demo by Benchmark.
 * 
 */
const Benchmark = require('benchmark');

let example01 = function () {
  let suite = new Benchmark.Suite;

  suite
    .add('RegExp#test', function () {
      /o/.test('hello world!');
    })
    .add('String#indexOf', function () {
      'hello world'.indexOf('o') > -1;
    })
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is', this.filter('fastest').map('name'));
    })
    .run({
      'async': true
    });
}

let example02 = function () {
  let suite = new Benchmark.Suite;
  let tmpNum = '100';

  let int1 = function (str) {
    return +str;
  }
  let int2 = function (str) {
    return Number(str);
  }
  let int3 = function (str) {
    return parseInt(str, 10);
  }

  suite
    .add('+', () => int1(tmpNum))
    .add('Number', () => int2(tmpNum))
    .add('parseInt', () => int3(tmpNum))
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is', this.filter('fastest').map('name'));
    })
    .run({
      'async': true
    });
}

if (require.main === module) {
  // example01();
  example02();
}