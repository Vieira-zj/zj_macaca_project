/**
 * Macaca test demos.
 * 
 */
'use strict';

require('should');
const fs = require('fs');
const opn = require('opn');
const path = require('path');
const wd = require('macaca-wd');

require('./wd-extend')(wd, false);

const diffImage = require('./utils.js').diffImage;

const testConsts = require('./test_consts');

describe('macaca-test/chrome_demo02.test.js', function () {
  this.timeout(5 * testConsts.timeUnit.minute);

  var driver = wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });

  before(() => {
    return driver
      .init({
        platformName: 'desktop',
        browserName: testConsts.envVars.browser,
        userAgent: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent`,
        deviceScaleFactor: 2
      })
      .setWindowSize(1280, 800);
  });

  after(function () {
    // open browser to show the test report after all done
    // opn(path.join(__dirname, '..', 'reports', 'index.html'));
    if (testConsts.envVars.browserClose) {
      return driver.close().quit();
    }
    return driver;
  });

  describe('Macaca api test demo for waitForElement()', function () {
    /**
     * function waitForElement(using, value, asserter, timeout, interval) {}
     * default timeout=1000ms, interval=200ms
     * example waitForElementByClassName('btn', 2000, 100) 
     * Search for element which class name is 'btn' at intervals of 100ms, last for 2000ms.
     */

    const initUrl = 'https://www.baidu.com';
    const timeOut = 10 * testConsts.timeUnit.second;
    const interval = 500;

    xit('#0, waitForElement() by default', function () {
      return driver.get(initUrl)
        .sleep(2 * testConsts.second)
        .waitForElementById('kw')
        .sendKeys('Macaca')
        .waitForElementById('su')
        .clickAndWait()
        // get text of 1st search result
        .waitForElementByTagName('em')
        .text()
        .then(value => console.log('1st result text:', value));
    });

    xit('#1, waitForElement() by wd.asserters=isDisplayed', function () {
      return driver
        .get(initUrl)
        .waitForElementById('kw', wd.asserters.isDisplayed, timeOut, interval)
        .sendKeys('Macaca')
        .waitForElementById('su', wd.asserters.isDisplayed, timeOut, interval)
        .clickAndWait()
        // get text of 1st search result
        .waitForElementByTagName('em', wd.asserters.nonEmptyText, timeOut, interval)
        .text()
        .then(value => console.log('1st result text:', value));
    });

    xit('#2, waitForElement() by wd.asserters=textInclude', function () {
      return driver
        .get(initUrl)
        .customOpenBaiduLoginDialog()
        .waitForElementByCssSelector('span#TANGRAM__PSP_4__titleText',
          wd.asserters.textInclude('百度'), timeOut, interval)
        .text()
        .then(value => console.log('login dialog title:', value));
    });

    xit('#3, waitForElement() by wd.asserters=jsCondition', function () {
      // Error: pending on execute jsConditionExpr
      const jsConditionExpr = `return true;`;

      return driver
        .get(initUrl)
        .waitForElementById('kw', wd.asserters.isDisplayed, timeOut, interval)
        .sendKeys('Macaca')
        .waitForElementById('su', wd.asserters.isDisplayed, timeOut, interval)
        .clickAndWait()
        // get text of 1st search result
        .waitForElementByTagName('em', wd.asserters.jsCondition(jsConditionExpr), timeOut, interval)
        .text()
        .then(value => console.log('1st search result:', value));
    });
  });

  describe('Macaca test demo, group 1', function () {
    const initUrl = 'https://www.baidu.com';
    const settingBtnSelector = 'div#u1>a[name="tj_settingicon"]';
    const searchSettingMenuItemSelector = 'div.bdpfmenu a.setpref';

    xit('#0, mouse hover over for dyn element, and click', function () {
      console.log('testing browser:', testConsts.envVars.browser);
      console.log('is browser close after done:', testConsts.envVars.browserClose);

      return driver
        .get(initUrl)
        .waitForElementByCssSelectorByDefault(settingBtnSelector)
        .isDisplayed()
        .then(value => {
          console.log('setting button is displayed:', value);
          value.should.be.ok();
        })
        .MouseOverOnElementByCssSelector(settingBtnSelector)
        .waitForElementByCssSelectorByDefault(searchSettingMenuItemSelector)
        .isDisplayed()
        .then(value => {
          console.log('search setting menu item is displayed:', value);
          value.should.be.ok();
        })
        .sleep(testConsts.waitTime.shortWait)
        .MouseClickOnElementByCssSelector(searchSettingMenuItemSelector)
        .sleep(testConsts.waitTime.shortWait)
        .getElementInnerTextByCssSelector('ul.pftab_hd>li:nth-child(1)')
        .then(value => console.log('setting text cn:', value));
    });
  });

  describe('Macaca test demo, group 2', function () {
    const url = 'https://www.baidu.com';

    xit('#0, set and get env variable', function () {
      if (process.env.INIT_URL) {
        console.log('env variable INIT_URL from chrome_demo_01.test.js');
      } else {
        console.log('set env variable INIT_URL');
        process.env.INIT_URL = url;
      }

      return driver
        .get(process.env.INIT_URL)
        .sleep(testConsts.waitTime.shortWait)
        .url()
        .then(value => console.log('env url:', value))
        .title()
        .then(value => console.log('title:', value));
    });

    it('#1, call overload extend method', function () {
      return driver
        .helloMsg()
        .helloMsgWithDefaultText('zhengjin')
        .then(() => console.log('test1'))
        .then(() => console.log('test2'));
    });

    xit('#2, read external test data', function () {
      const testdata = require('../testdata/testdata_01'); // json object

      return driver
        .get(url)
        .waitForElementByIdByDefault('kw')
        .sendkeysAndWait(testdata.searchKey1)
        .waitForElementByIdByDefault('su')
        .clickAndWait()
        .waitForElementByIdByDefault('kw')
        .clear()
        .sendkeysAndWait(testdata.searchKey2);
    });

  });

});