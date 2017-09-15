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
    return this.waitForElementById(id,
      testConsts.waitTime.timeOutForSearch,
      testConsts.waitTime.intervalForSearch);
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