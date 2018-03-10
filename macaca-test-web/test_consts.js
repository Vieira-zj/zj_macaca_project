/**
 * Constant varabiles for testing.
 * 
 */
'use strict';

/**
 * PRIVATE
 */
var getBrowser = function () {
  let browser = process.env.browser || 'electron' || 'puppeteer';
  return browser.toLowerCase();
}

var getBrowserClose = function () {
  if (process.env.BROWSER_CLOSE) {
    if (process.env.BROWSER_CLOSE === 'false') {
      return false;
    }
  }
  return true;
}

/**
 * PUBLIC
 */
const envVars = {
  browser: getBrowser(),
  // browser close after all test cases done, default as true
  browserClose: getBrowserClose(),
}

// Note: prefer use: const KEY_MAP = require('webdriver-keycode')
const keyCodes = {
  Backspace: '\uE003',
  Tab: '\uE004',
  Enter: '\uE007',
  Shift: '\uE008',
  Control: '\uE009',
  ArrowLeft: '\uE012',
  ArrowUp: '\uE013',
  ArrowRight: '\uE014',
  ArrowDown: '\uE015',
  Delete: '\uE017',
  Command: '\uE03D',
};

const timeUnit = {
  second: 1000,
  minute: 60 * this.second,
  hour: 60 * this.minute,
}

const waitTime = {
  shortWait: timeUnit.second,
  wait: 3 * timeUnit.second,
  longWait: 5 * timeUnit.second,
  timeOutForSearch: 15 * timeUnit.second,
  intervalForSearch: 500,
}

// wd apis: macaca-wd/lib/macaca-wd.js

// wd.asserters: macaca-wd/wd/lib/asserters.js
// isDisplayed, isNotDisplayed, onEmptyText, textInclude(content), jsCondition(jsConditionExpr)

module.exports = {
  envVars,
  keyCodes,
  timeUnit,
  waitTime,
}