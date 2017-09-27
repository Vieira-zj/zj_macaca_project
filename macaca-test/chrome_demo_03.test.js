/**
 * Create macaca test cases and run by template.
 * As write by test case, it cannot add hook functions, like: before(), beforeEach()
 * 
 */
const testConsts = require('./test_consts');
const runner = require('./macaca_tc_template');

// tc without description
let testCasesGroup1 = []

let testCase01 = function (driver) {
  return driver
    .get('https://www.baidu.com')
    .sleep(testConsts.waitTime.shortWait)
    .title()
    .then(value => console.log('page title:', value));
}
testCasesGroup1.push(testCase01);

let testCase02 = function (driver) {
  return driver
    .get('https://www.sogou.com')
    .sleep(testConsts.waitTime.shortWait)
    .title()
    .then(value => console.log('page title:', value));
}
testCasesGroup1.push(testCase02);


// tc with description
let testCasesGroup2 = []

let testCase03 = function (driver) {
  it('#3, open strikingly page', function () {
    return driver
      .get('https://www.qa.strikingly.com/')
      .title()
      .then(value => console.log('page title:', value));
  });
}
testCasesGroup2.push(testCase03);

let testCase04 = function (driver) {
  it('#3, open strikingly sxl page', function () {
    return driver
      .get('https://www.qa.sxl.cn/s#/')
      .title()
      .then(value => console.log('page title:', value));
  });
}
testCasesGroup2.push(testCase04);

runner.macacaTestCases(testCasesGroup1, false);
runner.macacaTestCases(testCasesGroup2);