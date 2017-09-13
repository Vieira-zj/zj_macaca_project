/**
 * Macaca api documents for JS:
 * https://macacajs.github.io/macaca-wd/
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
                userAgent: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent`,
                deviceScaleFactor: 2
            })
            .setWindowSize(1280, 800);
    });

    after(function () {
        opn(path.join(__dirname, '..', 'reports', 'index.html')); // test report path
    });

    describe('Macaca demos, group 1', function () {
        const initialURL = 'https://www.baidu.com';

        after(function () {
            return driver.quit();
        });

        xit('#1, Access BaiDu', function () {
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
        // TODO: css selector
    });

});