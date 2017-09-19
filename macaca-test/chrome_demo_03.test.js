/**
 * Create macaca test cases and run by template.
 * 
 */
const testConsts = require('./test_consts');
const runner = require('./macaca_tc_template');

let testCases = []

let testCase01 = function (driver) {
  return driver
    .get('https://www.baidu.com')
    .sleep(testConsts.timeUnit.second)
    .title()
    .then(value => console.log('page title:', value));
}
testCases.push(testCase01);

let testCase02 = function (driver) {
  return driver
    .get('https://www.sogou.com')
    .sleep(testConsts.timeUnit.second)
    .title()
    .then(value => console.log('page title:', value));
}
testCases.push(testCase02);

runner.macacaTestCases(testCases);