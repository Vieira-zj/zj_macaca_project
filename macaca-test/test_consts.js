/**
 * const varabiles for testing.
 */

// use const KEY_MAP = require('webdriver-keycode'); instead
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
  // keycode Delete is invalid on Mac
  Delete: '\uE05D',
};

const waitTime = {
  shortWait: 1000,
  wait: 3000,
  longWait: 5000,
  timeOutForSearch: 15 * 1000,
  intervalForSearch: 500,
}

module.exports = {
  keyCodes,
  waitTime,
}