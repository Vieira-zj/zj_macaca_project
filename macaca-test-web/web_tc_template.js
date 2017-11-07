/**
 * Template to run macaca test cases and test groups.
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

let buildDriver = function () {
  return wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });
};

let initDriver = function (driver) {
  const desiredCapabilities = {
    platformName: 'desktop',
    browserName: testConsts.envVars.browser,
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent',
    deviceScaleFactor: 2
  }

  return driver
    .init(desiredCapabilities)
    .setWindowSize(1280, 800);
};

let quitDriver = function (driver) {
  // open browser to show the test report after all done
  // opn(path.join(__dirname, '..', 'reports', 'index.html'));
  if (testConsts.envVars.browserClose) {
    return driver.close().quit();
  }
  return driver;
};

// global test context
let testContext = {
  totalTcs: 0,
  passedTcs: 0,
  failedTcs: 0,
};

let macacaTestCases = function (testCases, isTcWithDesc = true) {
  describe('Macaca test cases from macaca_tc_template.js', function () {
    this.timeout(5 * testConsts.timeUnit.minute);
    this.slow(testConsts.timeUnit.minute);

    var driver = buildDriver();

    // run each tc in new session
    beforeEach(() => {
      return initDriver(driver);
    });
    afterEach(() => {
      return quitDriver(driver);
    });

    for (let i = 0, length = testCases.length; i < length; i++) {
      driver.totalTcs += 1;
      let tc = testCases[i];
      if (isTcWithDesc) {
        tc(driver);
      } else {
        // use default tc description
        it(`run test case => ${tc.name}`, function () {
          return tc(driver);
        });
      }
    }
  });
};

let macacaTestGroups = function (testGroups) {
  describe('Macaca test groups from macaca_tc_template.js', function () {
    this.timeout(5 * testConsts.timeUnit.minute);
    this.slow(testConsts.timeUnit.minute);

    let driver = buildDriver();

    after(function () {
      console.log('TOTAL TEST CASES:', testContext.totalTcs);
    });

    beforeEach(() => {
      return initDriver(driver);
    });
    afterEach(() => {
      testContext.totalTcs += 1;
      return quitDriver(driver);
    });

    for (let i = 0, length = testGroups.length; i < length; i++) {
      testGroups[i](driver);
    }
  });
};

module.exports = {
  macacaTestCases,
  macacaTestGroups,
}