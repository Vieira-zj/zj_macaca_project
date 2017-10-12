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
// testGroups.push(testGroup1);

let testGroup2 = function (driver) {
  describe('Macaca test group 2', function () {
    before(() => console.log('Start: run test group 2'));
    after(() => console.log('End: run test group 2'));

    it('#2, test case 03', function () {
      console.log('driver session id:', driver.sessionID);

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
        .then(value => console.log('page title:', value))
        .getSessionId()
        .then(value => console.log('session id:', value));
    });
  });
};
// testGroups.push(testGroup2);

let testGroup3 = function (driver) {
  describe('Macaca test group 3', function () {
    const url = 'https://www.qa.sxl.cn/s#';
    const timeOut = 10 * testConsts.timeUnit.second;
    const interval = 500;

    xit('#4, test case 05, waitForElements', function () {
      return driver
        .get(url)
        .waitForElementsByCssSelector('input[type="text"]')
        .then(function (els) {
          console.log('element input count:', els.length);
          return els[0];
        })
        // multiple actions on element
        .sendKeys('test')
        .sleep(testConsts.waitTime.shortWait)
        .clear()
        .sendKeys('strikingly');
    });

    xit('#5, test case 06, chain method by promise', function () {
      return driver
        .get(url)
        .sleepByPromise(testConsts.waitTime.shortWait)
        .then(function (val) {
          console.log('sleep:', val);
          val.should.be.true('FAIL, sleep by promise');
        })
        .waitForElementsByCssSelector('input[type="text"]')
        .then(function (els) {
          console.log('element input count:', els.length);
          els[0].sendKeys('strikingly');
        })
        .title()
        .then(title => console.log('page title:', title))
        .catch(reason => console.error(reason));
    });

    it('#6, test case 07, chain method', function () {
      return driver
        .get(url)
        .title()
        .then(title => console.log('page title:', title))
        .returnHelloMessage()
        .then(val => console.log('message:', val))
        .waitForElementByCssSelector('input[class="submit s-btn"]')
        .click();
    });
  });
};
testGroups.push(testGroup3);

runner.macacaTestGroups(testGroups);