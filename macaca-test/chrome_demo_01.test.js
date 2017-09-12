/**
 * Macaca apis for JS:
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
            .setWindowSize(1920, 1080);
    });

    after(function () {
        opn(path.join(__dirname, '..', 'reports', 'index.html')); // test report path
    });

    describe('macaca demos', function () {
        it('#1, search macaca from BaiDu', function () {
            const initialURL = 'https://www.baidu.com';
            return driver
                .get(initialURL)
                .sleep(3000)
                .elementById('kw')
                .sendKeys('macaca')
                .sleep(3000)
                .elementById('su')
                .click()
                .sleep(5000)
                .elementsByClassName('a')
                .then(function (eles) {
                    // todo
                    html.should.containEql('macaca');
                });
        });
    });
});