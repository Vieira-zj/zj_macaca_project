/**
 * Create macaca test cases and run by template.
 * As write by test case, it cannot add hook functions, like: before(), beforeEach()
 * 
 */
const testConsts = require('./test_consts');
const runner = require('./web_tc_template');

// tc without description
let testCasesGroup1 = [];

let testCase01 = function (driver) {
  return driver
    .get('https://www.baidu.com')
    .sleep(testConsts.waitTime.shortWait)
    .title()
    .then(value => console.log('page title:', value));
};
testCasesGroup1.push(testCase01);

let testCase02 = function (driver) {
  return driver
    .get('https://www.sogou.com')
    .sleep(testConsts.waitTime.shortWait)
    .title()
    .then(value => console.log('page title:', value));
};
testCasesGroup1.push(testCase02);


// tc with description
let testCasesGroup2 = [];

let testCase03 = function (driver) {
  it('#03-01, open strikingly page', function () {
    return driver
      .get('https://www.qa.strikingly.com/')
      .title()
      .then(value => console.log('page title:', value));
  });
};
testCasesGroup2.push(testCase03);

let testCase04 = function (driver) {
  it('#03-02, open strikingly sxl page', function () {
    return driver
      .get('https://www.qa.sxl.cn/s#/')
      .title()
      .then(value => console.log('page title:', value));
  });
};
testCasesGroup2.push(testCase04);

let testCase05 = function (driver) {
  it('#03-03, JQuery test demo 01', function () {
    return driver
      .get('https://www.baidu.com')
      // get element property
      .execute(`return $('input#su').attr('value');`)
      .then(val => console.log('search button text:', val))
      // get element inner text
      .execute(`return $('a#setf').text();`)
      .then(val => console.log('link text:', val))
      // set element css property
      .execute(`$('a#setf').css({ color: 'red', background: 'black' });`)
      .sleep(testConsts.waitTime.shortWait)
      // check changed color
      .elementByCssSelector('a#setf')
      .getComputedCss('color')
      .then(val => console.log('css color:', val))
      // collection in JQuery
      .execute(`$('p#lh>a').each(function(i){this.style.backgroundColor=['#ccc','#fff'][i%2]});`)
  });
};
testCasesGroup2.push(testCase05);

let testCase06 = function (driver) {
  it('#03-04, JQuery test demo 02', function () {
    return driver
      .get('https://www.baidu.com')
      // action: mouseover and click
      .execute(`$('a[name="tj_settingicon"]').mouseover();`)
      .sleep(testConsts.waitTime.shortWait)
      .execute(`$('a.setpref').click();`)
      .sleep(testConsts.waitTime.shortWait)
      // input text in textbox
      .execute(`$('input#kw').val('macaca');`);
  });
};
testCasesGroup2.push(testCase06);

let testCase07 = function (driver) {
  it('#03-05, getComputedCss', function () {
    const cssSelector = 'a#setf'

    return driver
      .get('https://www.baidu.com')
      .syncWaitByPromise(5)
      .waitForElementByCssSelector(cssSelector)
      .text()
      .then(val => console.log('link text:', val))
      .elementByCssSelector(cssSelector)
      .getComputedCss('color')
      .then(val => console.log('css color:', val))
      .syncWaitBySleep(5)
      .then(console.log('getComputedCss done.'));
  });
};
testCasesGroup2.push(testCase07);

let testCase08 = function (driver) {
  it('#03-06, safe click demo', function () {
    return driver
      .get('https://www.baidu.com')
      .waitForElementByCssSelectorByDefault('#kw')
      .click()
      .sleep(testConsts.waitTime.wait)
      .safeClick('.setpref')
      .then(() => console.log('safe click demo finished.'));
  });
};
testCasesGroup2.push(testCase08);

runner.macacaTestCases(testCasesGroup1, false);
runner.macacaTestCases(testCasesGroup2);
