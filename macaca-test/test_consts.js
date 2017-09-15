/**
 * const varabiles for testing.
 */

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
  // keycode Delete is invalid on Mac
  Delete: '\uE05D',
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

module.exports = {
  keyCodes,
  timeUnit,
  waitTime,
}