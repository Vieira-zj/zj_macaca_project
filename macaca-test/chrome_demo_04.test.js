/**
 * Create macaca test groups and run by template.
 * As write by test group, it ok for add hook functions, like: after(), afterEach()
 * 
 */
const testConsts = require('./test_consts');
const runner = require('./macaca_tc_template');

let testGroups = [];

let testGroup1 = function (driver) {
  describe('Macaca test group 1', function () {
    before(() => console.log('Start: run test group 1'));
    after(() => console.log('End: run test group 1'));

    it('#0, test case 01', function () {
      return driver
        .get('https://www.baidu.com')
        .sleep(testConsts.waitTime.shortWait)
        .title()
        .then(value => console.log('page title:', value));
    });

    it('#1, test case 02', function () {
      return driver
        .get('https://www.sogou.com')
        .sleep(testConsts.waitTime.shortWait)
        .title()
        .then(value => console.log('page title:', value));
    });
  });
};
testGroups.push(testGroup1);

let testGroup2 = function (driver) {
  describe('Macaca test group 2', function () {
    before(() => console.log('Start: run test group 2'));
    after(() => console.log('End: run test group 2'));

    it('#2, test case 03', function () {
      return driver
        .get('https://www.qa.strikingly.com')
        .execute('return document.title')
        .then(value => console.log('page title:', value));
    });

    it('#3, test case 04', function () {
      const jsGetTitle = 'document.title';

      return driver
        .get('https://www.qa.sxl.cn/s#')
        .execute(`return ${jsGetTitle}`)
        .then(value => console.log('page title:', value));
    });
  });
}
testGroups.push(testGroup2);

runner.macacaTestGroups(testGroups);