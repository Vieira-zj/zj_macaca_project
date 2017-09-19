/**
 * Macaca test case template.
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

let fnBeforeAll = function (driver) {
  return driver
    .init({
      platformName: 'desktop',
      browserName: testConsts.envVars.browser,
      userAgent: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent`,
      deviceScaleFactor: 2
    })
    .setWindowSize(1280, 800);
}

let fnAfterAll = function (driver) {
  // open browser to show the test report after all done
  // opn(path.join(__dirname, '..', 'reports', 'index.html'));
  if (testConsts.envVars.browserClose) {
    return driver.close().quit();
  }
  return driver;
}

let initDriver = function () {
  return wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });
}

let macacaTestCases = function (testCases) {
  describe('Macaca test cases from macaca_tc_template.js', function () {
    this.timeout(5 * testConsts.timeUnit.minute);
    this.slow(testConsts.timeUnit.minute);

    var driver = initDriver();

    before(() => {
      return fnBeforeAll(driver);
    });

    after(function () {
      return fnAfterAll(driver);
    });

    for (let i = 0, length = testCases.length; i < length; i++) {
      let tc = testCases[i];
      it(`run test case => ${tc.name}`, function () {
        return tc(driver);
      });
    }
  });
};

let macacaTestGroups = function (testGroups) {
  describe('Macaca test groups from macaca_tc_template.js', function () {
    this.timeout(5 * testConsts.timeUnit.minute);
    this.slow(testConsts.timeUnit.minute);

    var driver = initDriver();

    before(() => {
      return fnBeforeAll(driver);
    });

    after(function () {
      return fnAfterAll(driver);
    });

    for (let i = 0, length = testGroups.length; i < length; i++) {
      testGroups[i](driver);
    }
  });
}

module.exports = {
  macacaTestCases,
  macacaTestGroups,
}