/**
 * Macaca for nodejs:
 * https://macacajs.github.io/nodejs
 * 
 * Macaca api documents for JS:
 * https://macacajs.github.io/macaca-wd/
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

describe('macaca-test/chrome_demo01.test.js', function () {
    this.timeout(5 * 60 * 1000);

    var driver = wd.promiseChainRemote({
        host: 'localhost',
        port: process.env.MACACA_SERVER_PORT || 3456
    });

    before(() => {
        // set env variable "url"
        if (!process.env.INIT_URL) {
            process.env.INIT_URL = 'https://www.baidu.com';
        }

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
            return driver
                .close()
                .quit();
        }
        return driver;
    });

    describe('Macaca demos, group 1', function () {
        const initialURL = 'https://www.baidu.com';

        after(function () {});

        xit('#1, access BaiDu', function () {
            return driver
                .get(initialURL)
                // get request url
                .url()
                .then(function (url) {
                    console.log('url:', url);
                })
                // get page title
                .title()
                .then(function (title) {
                    console.log('title:', title);
                })
                // get server status
                .status()
                .then(function (status) {
                    console.log('status properties:');
                    for (var attr in status) {
                        if (status.hasOwnProperty(attr)) {
                            console.log(attr);
                        }
                    }
                    console.log(JSON.stringify(status, null, '  '));
                });
        });

        xit('#2, do search Macaca', function () {
            const testKeyword = 'Macaca';

            return driver
                .get(initialURL)
                // input and search
                .waitForElementByIdByDefault('kw')
                .sendKeys(testKeyword)
                .waitForElementByIdByDefault('su')
                .clickAndWait()
                // get text of 1st search result
                .waitForElementByTagName('em')
                .text()
                .then(value => console.log('1st result text:', value))
                // get count of all tags "em"
                .elementsByTagName('em')
                .then(function (links) {
                    console.log('links count:', links.length);
                    links.forEach(function (element) {
                        element.should.be.a.Object();
                    });
                })
                // verify "Macaca" is included in search results
                // Note: before run js script, make sure ui element is dislayed
                .execute(`
                    var links = document.getElementsByTagName('em');
                    for (var i = 0, length = links.length; i < length; i++) {
                        if (links[i].innerText === '${testKeyword}') {
                            return true;
                        }
                    }
                    return false;`)
                .then(value => console.log('verify search results:', value ? 'pass' : 'fail'));
        });

        xit('#3, run js script', function () {
            return driver
                .get(initialURL)
                // verify element exist
                .hasElementById('setf')
                .then(exist => exist.should.be.ok())
                // run JS script to change link background and return text
                .execute(`
                    var uiElement = document.getElementById('setf');
                    uiElement.style.backgroundColor="#000000";
                    return uiElement.innerText;`)
                .then(value => console.log('link text by JS return:', value))
                // get link text
                .waitForElementByIdByDefault('setf')
                .text()
                .then(value => console.log('link text by Macaca:', value));
            // .elementById('su')
            // .getProperty('value') // error in web, only for mobile
            // .then(value => console.log('search button text:', value));
        });

        xit('#4, change text by keycode', function () {
            return driver
                .get(initialURL)
                // input search string
                .waitForElementById('kw')
                .sendKeys('Macacaa')
                .sleep(1000)
                // delete last character
                .keys(testConsts.keyCodes.Shift + testConsts.keyCodes.ArrowLeft)
                .sleep(1000)
                .keys(testConsts.keyCodes.Backspace);
        });
    });

    describe('Macaca demos, group 2', function () {
        const initialURL = 'https://www.baidu.com';

        after(() => {});

        xit('#0, do login by keycode', function () {
            return driver
                .get(initialURL)
                // check text for setting link
                .waitForElementByCssSelector('div#u1 > a[name=tj_settingicon]')
                .text()
                .then(value => console.log('setting text:', value))
                // open login dialog
                .openBaiduLoginDialog()
                // input user incorrect name
                .elementByCssSelector('input[name=userName]')
                .sendKeys('zheng jin tesat')
                .sleep(1000)
                // change user name
                .keys(testConsts.keyCodes.ArrowLeft)
                .sleep(1000)
                .keys(testConsts.keyCodes.Backspace)
                .sleep(1000)
                // tab to input password
                // use keys() instead of sendKeys()
                // sendKeys(), send keys to current ui element (user name)
                // keys(), just send keys without context
                .keys(testConsts.keyCodes.Tab)
                .sleep(1000)
                .keys('123456')
                .sleep(1000)
                .keys(testConsts.keyCodes.Enter)
                .waitForElementByCssSelector('div#passport-login-pop-dialog span#TANGRAM__PSP_10__error')
                .isDisplayed()
                .then(value => console.log('error message is show:', value));
        });

        xit('#1, check error message on user login dialog', function () {
            // print env variables set from command 'macaca run'
            console.log('chrome driver version:', process.env.CHROMEDRIVER_VERSION);
            console.log('browser:', process.env.browser);

            return driver
                .get(initialURL)
                .openBaiduLoginDialog()
                // input user name
                .elementByCssSelector('input[name=userName]')
                .sendKeys('zheng jin test')
                // input password and clear
                .elementByCssSelector('input[name=password]')
                .sendKeys('123456')
                .sleep(1000)
                .clear()
                .sleep(1000)
                // click login button
                .execute(`
                    var element = document.querySelector('div#passport-login-pop-dialog input[type=submit]');
                    return element.value;`)
                .then(value => console.log('click on button:', value))
                .elementByCssSelector('div#passport-login-pop-dialog input[type=submit]')
                .click()
                // verify error message
                .waitForElementByCssSelector('div#passport-login-pop-dialog #TANGRAM__PSP_10__error')
                .isDisplayed()
                .then(value => console.log('error message show:', value ? 'pass' : 'fail'))
                .elementByCssSelector('#TANGRAM__PSP_10__error')
                .text()
                .then(value => console.log(`error message text: ${value}`));
        });
    });

    describe('Macaca demos, gropu 3', function () {
        const initialURL = 'https://www.baidu.com';

        xit('#0, call custom methods', function () {
            return driver
                .get(initialURL)
                .openBaiduLoginDialog()
                // verify auto login checkbox status
                .waitForElementByCssSelector('div#passport-login-pop-dialog input[name=memberPass]')
                .execute(`
                var element = document.querySelector('div#passport-login-pop-dialog input[name=memberPass]');
                return element.checked;`)
                .then(value => {
                    console.log('auto login checkbox checked:', value);
                    value.should.be.ok();
                });
        });

        xit('#1, call custom tasks', function () {
            return driver
                .get(initialURL)
                .customOpenBaiduLoginDialog()
                .waitForElementByCssSelector('span#TANGRAM__PSP_4__titleText')
                .text()
                .then(value => console.log('login dialog title:', value));
        });

        xit('#2, wait after each action', function () {
            return driver
                .get(initialURL)
                .waitForElementByIdByDefault('kw')
                .sendkeysAndWait('Macaca', 3 * testConsts.timeUnit.second)
                .sendkeysAndWait(' framework')
                .waitForElementById('su')
                .clickAndWait();
        });

        xit('#3, verification by diff image', function () {
            return driver
                .get(initialURL)
                .sleep(testConsts.waitTime.shortWait)
                // .customSaveScreenshot(this) // save error baseline
                .sleep(testConsts.waitTime.shortWait)
                .openBaiduLoginDialog()
                // .customSaveScreenshot(this) // save origin baseline
                .takeScreenshot()
                .then(imgData => {
                    const screenshotFolder = path.resolve(__dirname, '../screenshots');
                    const originImgPath = path.join(screenshotFolder, 'origin.png');
                    fs.exists(originImgPath, function (exists) {
                        exists.should.be.ok('origin image exist.');
                    }); // Warn: sync function

                    const newImg = new Buffer(imgData, 'base64');
                    fs.writeFileSync(path.join(screenshotFolder, 'new.png'), newImg.toString('binary'), 'binary');

                    const diffImgPath = path.join(screenshotFolder, 'diff.png');
                    return diffImage(originImgPath, newImg, 0.1, diffImgPath);
                })
                .then(result => {
                    result.should.be.true('image diff.');
                })
                .catch(e => {
                    console.error(e);
                });

        });
    });

});