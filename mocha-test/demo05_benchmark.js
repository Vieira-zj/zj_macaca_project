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

if (require.main === module) {
  example01();
}