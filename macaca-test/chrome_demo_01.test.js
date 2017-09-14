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

var browser = process.env.browser || 'electron' || 'puppeteer';
browser = browser.toLowerCase();

describe('macaca-test/chrome_demo01.test.js', function () {
    this.timeout(5 * 60 * 1000);

    var driver = wd.promiseChainRemote({
        host: 'localhost',
        port: process.env.MACACA_SERVER_PORT || 3456
    });

    before(() => {
        return driver
            .init({
                platformName: 'desktop',
                browserName: browser,
                userAgent: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent`,
                deviceScaleFactor: 2
            })
            .setWindowSize(1280, 800);
    });

    after(function () {
        opn(path.join(__dirname, '..', 'reports', 'index.html')); // test report path
        return driver
            .close()
            .quit();
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
                // get status
                .status()
                .then(function (status) {
                    console.log('status properties:');
                    for (var attr in status) {
                        if (status.hasOwnProperty(attr)) {
                            console.log(attr);
                        }
                    }
                    console.log(JSON.stringify(status, null, '    '));
                });
        });

        const timeOut = 3000;
        const interval = 200;

        xit('#2, do search Macaca', function () {
            return driver
                .get(initialURL)
                // input and search
                .waitForElementById('kw', timeOut, interval)
                .sendKeys('Macaca')
                .waitForElementById('su', timeOut, interval)
                .click()
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
                        if (links[i].innerText === 'Macaca') {
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
                .waitForElementById('setf')
                .text()
                .then(value => console.log('link text by Macaca:', value));
            // .elementById('su')
            // .getProperty('value') // error in web, only for mobile
            // .then(value => console.log('search button text:', value));
        });
    });

    describe('Macaca demos, group 2', function () {
        const initialURL = 'https://www.baidu.com';

        after(() => {});

        it('#0, error message on user login dialog', function () {
            // print env variables set from command 'macaca run'
            console.log('chrome driver version:', process.env.CHROMEDRIVER_VERSION);
            console.log('browser:', process.env.browser);

            return driver
                .get(initialURL)
                // click login
                .waitForElementByCssSelector('div#u1 > a[name=tj_login]')
                .click()
                .sleep(2000)
                .waitForElementByCssSelector('div#passport-login-pop-dialog')
                .isDisplayed()
                .then(value => console.log('login dialog show:', value ? 'pass' : 'fail'))
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

});