'use strict';

const path = require('path');
const _ = require('macaca-utils');
const KEY_MAP = require('webdriver-keycode');
const appendToContext = require('macaca-reporter').appendToContext;

const testConsts = require('./test_consts');
const testTasks = require('./test_tasks');

// npm package wrapper sample: https://github.com/macaca-sample/webdriver-client

module.exports = (wd, isIOS) => {
  wd.addPromiseChainMethod('customback', function () {
    if (isIOS) {
      return this
        .waitForElementByName('list')
        .click()
        .sleep(1000);
    }

    return this
      .back()
      .sleep(3000);
  });

  wd.addPromiseChainMethod('appLogin', function (username, password) {
    if (isIOS) {
      return this
        .waitForElementByXPath('//XCUIElementTypeTextField[1]')
        .clear()
        .sendKeys(username)
        .waitForElementByXPath('//XCUIElementTypeSecureTextField[1]')
        .clear()
        .sendKeys(password)
        .sleep(1000)
        .sendKeys('\n')
        .waitForElementByName('Login')
        .click()
        .sleep(5000);
    }

    return this
      .waitForElementsByClassName('android.widget.EditText', {}, 120000)
      .then(function (els) {
        return els[0];
      })
      .clear()
      .sendKeys(username)
      .elementByXPath('//android.widget.EditText[1]')
      .getProperty('value')
      .then(info => {
        console.log(`element value: ${JSON.stringify(info)}`);
      })
      .sleep(1000)
      .waitForElementsByClassName('android.widget.EditText')
      .then(function (els) {
        return els[1];
      })
      .clear()
      .sendKeys(password)
      .keys(`${KEY_MAP.ENTER}${KEY_MAP.ESCAPE}`)
      .sleep(1000)
      .source()
      .waitForElementByName('Login')
      .click()
      .sleep(5000);
  });

  wd.addPromiseChainMethod('changeToNativeContext', function () {
    return this
      .contexts()
      .then(arr => {
        return this
          .context(arr[0]);
      });
  });

  wd.addPromiseChainMethod('changeToWebviewContext', function () {
    if (isIOS) {
      return this
        .contexts()
        .then(arr => {
          return this
            .context(arr[arr.length - 1]);
        });
    }

    return this
      .contexts()
      .then(arr => {
        return this
          .context(arr[arr.length - 1]);
      })
      .windowHandles()
      .then(handles => {
        if (handles.length > 1) {
          return this
            .window(handles[handles.length - 1]);
        }
      })
      .sleep(1000);
  });

  wd.addPromiseChainMethod('testGetProperty', function () {
    if (isIOS) {
      return this
        .waitForElementByName('list')
        .getProperty('isVisible')
        .then(info => {
          console.log(`isVisible: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('isAccessible')
        .then(info => {
          console.log(`element isAccessible: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('isEnabled')
        .then(info => {
          console.log(`element isEnabled: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('type')
        .then(info => {
          console.log(`element type: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('label')
        .then(info => {
          console.log(`element label: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('name')
        .then(info => {
          console.log(`element name: ${JSON.stringify(info)}`);
        })
        .waitForElementByName('list')
        .getProperty('value')
        .then(info => {
          console.log(`element value: ${JSON.stringify(info)}`);
        });
    }

    // for Android

    return this
      .waitForElementByName('list')
      .getProperty('description') // content-desc
      .then(d => {
        console.log(d);
      });
  });

  wd.addPromiseChainMethod('customSaveScreenshot', function (context) {
    const filepath = path.join(__dirname, '..', 'screenshots', `${_.uuid()}.png`);
    const reportspath = path.join(__dirname, '..', 'reports');
    _.mkdir(path.dirname(filepath));

    return this
      .saveScreenshot(filepath)
      .then(() => {
        appendToContext(context, `${path.relative(reportspath, filepath)}`);
      });
  });

  // customized by zj
  // COMMON UTILS
  wd.addPromiseChainMethod('clickAndWait', function (wait = testConsts.waitTime.shortWait) {
    return this.click().sleep(wait);
  });

  wd.addPromiseChainMethod('sendkeysAndWait', function (keys, wait = testConsts.waitTime.shortWait) {
    // Note: error: sendKeys is not a function, and use keys() instead of sendKeys()
    // return this.sendKeys(keys).sleep(wait);
    return this.keys(keys).sleep(wait);
  });

  wd.addPromiseChainMethod('waitForElementByIdByDefault', function (id) {
    return this.waitForElementById(
      id,
      wd.asserters.isDisplayed,
      testConsts.waitTime.timeOutForSearch,
      testConsts.waitTime.intervalForSearch);
  });

  wd.addPromiseChainMethod('waitForElementByCssSelectorByDefault', function (id) {
    return this.waitForElementByCssSelector(
      id,
      wd.asserters.isDisplayed,
      testConsts.waitTime.timeOutForSearch,
      testConsts.waitTime.intervalForSearch);
  });

  wd.addPromiseChainMethod('waitForElementsByCssSelectorByDefault', function (id) {
    return this.waitForElementsByCssSelector(
      id,
      wd.asserters.isDisplayed,
      testConsts.waitTime.timeOutForSearch,
      testConsts.waitTime.intervalForSearch);
  });

  wd.addPromiseChainMethod('MouseOverOnElementByCssSelector', function (cssSelector) {
    return this
      .execute(
        `
        var element = document.querySelector('${cssSelector}');
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent('mouseover', true, true);
        element.dispatchEvent(event);
        `
      )
      .sleep(testConsts.waitTime.shortWait);
  });

  wd.addPromiseChainMethod('MouseClickOnElementByCssSelector', function (cssSelector) {
    return this
      .execute(
        `
        var element = document.querySelector('${cssSelector}');
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true);
        element.dispatchEvent(event);
        `
      )
      .sleep(testConsts.waitTime.shortWait);
  });

  wd.addPromiseChainMethod('getElementInnerTextByCssSelector', function (cssSelector) {
    return this.execute(`
      var element = document.querySelector('${cssSelector}');
      return element.innerText;  
    `);
  });

  wd.addPromiseChainMethod('writeLog', function (logText) {
    console.log(logText);
    return this;
  });

  wd.addPromiseChainMethod('safeClick', function (cssSelector) {
    let timeout = 15; // seconds
    let driver = this;

    let fnIsDisplayed = async function () {
      return driver.execute(`return $('${cssSelector}').is(':visible');`);
    }
    let fnSafeClick = async function () {
      for (let i = 1; i <= timeout; i++) {
        if (await fnIsDisplayed()) {
          return driver
            .waitForElementByCssSelectorByDefault(cssSelector)
            .click();
        }
        console.log(`wait for element visible: ${i} seconds`);
        await driver.sleep(testConsts.waitTime.shortWait);
      }
      throw new Error(`The element (${cssSelector}) is unavailable when do click!`);
    }

    return fnSafeClick();
  });

  // TEST CHAIN METHOD
  // do not support method overload, 1st method will be overrided
  wd.addPromiseChainMethod('helloMsg', function () {
    console.log('call helloMessage without args.');
    return this.helloMsgWithDefaultText();
  });

  wd.addPromiseChainMethod('helloMsgWithDefaultText', function (text = 'guest') {
    console.log('call helloMessage with args.');
    console.log('hello', text);
    return this;
  });

  // only return string
  wd.addPromiseChainMethod('retHelloMsg', function () {
    return 'hello world';
  });

  // sync wait by promise
  wd.addPromiseChainMethod('waitByPromise', function (wait) {
    return new Promise(function (resolve, reject) {
      if (wait < 1000) {
        reject('invalid wait time');
      }

      setTimeout(function () {
        console.log(`wait for ${wait} ms`);
        resolve(true);
      }, wait);
    });
  });

  // sync wait
  wd.addPromiseChainMethod('syncWaitByPromise', function (seconds) {
    let driver = this;
    async function syncWait() {
      for (let i = 1; i <= seconds; i++) {
        console.log('wait for seconds:', i);
        await driver.waitByPromise(testConsts.waitTime.shortWait);
      }
    }
    return syncWait(); // return promise
  });

  // sync wait
  wd.addPromiseChainMethod('syncWaitBySleep', function (seconds) {
    let driver = this;
    let syncWait = async function () {
      for (let i = 1; i <= seconds; i++) {
        console.log('sleep for seconds:', i);
        await driver.sleep(testConsts.waitTime.shortWait);
      }
    }
    return syncWait();
  });

  // UI TASKS
  wd.addPromiseChainMethod('openBaiduLoginDialog', function () {
    return this
      // click login and wait for dialog
      .waitForElementByCssSelector('div#u1 > a[name=tj_login]')
      .click()
      .sleep(testConsts.waitTime.shortWait)
      .waitForElementByCssSelector('div#passport-login-pop-dialog')
      .isDisplayed()
      .then(value => console.log('login dialog show:', value ? 'pass' : 'fail'))
      .sleep(testConsts.waitTime.shortWait);
  });

  wd.addPromiseChainMethod('customOpenBaiduLoginDialog', function () {
    return testTasks.openBaiduLoginDialog(this);
  });

};