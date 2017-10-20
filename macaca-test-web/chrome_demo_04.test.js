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
testGroups.push(testGroup2);

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

let testGroups2 = []

let testGroup4 = function (driver) {
  describe('Macaca test group 4', function () {
    const url = 'https://www.baidu.com';

    xit('#7, test case 08, window handles', function () {
      return driver
        .get(url)
        .title()
        .then(title => console.log('page title:', title))
        .windowHandles()
        .then(windows => {
          console.log('widnow handles count:', windows.length);
          windows.forEach(function (el, idx) {
            console.log(`window handle at index ${idx}: ${el}`);
          });
        })
        .windowHandle()
        .then(window => console.log('current window handle:', window));
    });

    it('#8, test case 09, iframe in sxl', function () {
      return driver
        .get('https://www.qa.sxl.cn/s/login')
        .writeLog('Step1: login by user id and password, and submit.')
        .waitForElementByCssSelectorByDefault('div.input>input#user_email')
        .sendKeys('autoqa_sxl_mp_blog_27@sxl.cn')
        .elementByCssSelector('div.input>input#user_password')
        .sendKeys('testtest')
        .elementByCssSelector('div[class="submit center"]>input[class="submit s-btn"]')
        .click()
        .writeLog('Step2: navigate to the preview page, and open the preview iframe.')
        .waitForElementByCssSelectorByDefault('a[class="my-miniprogram s-link"]')
        .click()
        .waitForElementByCssSelectorByDefault('ul.pages>li:first-child a.s-btn')
        .click()
        .waitForElementByCssSelectorByDefault('div.preview-iframe')
        .click()
        .writeLog('Step3: verify preview iframe.')
        .sleep(testConsts.waitTime.wait)
        .windowHandles()
        .then(windows => {
          console.log('widnow handles count:', windows.length);
          if (windows.length > 1) {
            windows.forEach(function (el, idx) {
              console.log(`window handle at index ${idx}: ${el}`);
            });
          }
        })
        .elementByCssSelector('div.preview-iframe')
        .isDisplayed()
        .then(show => console.log('iframe div is displayed:', show))
        .elementsByCssSelector('div.wx-scroll-view span')
        .then(els => {
          console.log('span count:', els.length); // 0
        })
        .writeLog('Step4: exit preview iframe.')
        .elementByCssSelector('div.preview-button button[class="s-btn gray"]')
        .click()
        .sleep(testConsts.waitTime.shortWait);
    });
  });
};
testGroups2.push(testGroup4);


// runner.macacaTestGroups(testGroups);
runner.macacaTestGroups(testGroups2);