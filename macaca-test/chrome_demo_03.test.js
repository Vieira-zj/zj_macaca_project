/**
 * Create macaca test cases via template.
 * 
 */
const testConsts = require('./test_consts');
const runner = require('./macaca_tc_template');

let testCase01 = function (driver) {
  return driver
    .get('https://www.baidu.com')
    .sleep(testConsts.timeUnit.second)
    .title()
    .then(value => console.log('page title:', value));
}

let testCase02 = function (driver) {
  return driver
    .get('https://www.sogou.com')
    .sleep(testConsts.timeUnit.second)
    .title()
    .then(value => console.log('page title:', value));
}

runner.macacaTestCases([testCase01, testCase02]);