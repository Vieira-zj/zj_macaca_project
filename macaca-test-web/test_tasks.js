/**
 * Include common UI tasks invoked by auto test cases.
 * 
 */

const testConsts = require('./test_consts');
const uiObjects = require('./test_uiobjects');

const openBaiduLoginDialog = function (driver) {
  // click login and wait for dialog
  return driver
    .waitForElementByCssSelector(uiObjects.baiduMainPage.selectorLoginLink)
    .click()
    .sleep(testConsts.waitTime.shortWait)
    .waitForElementByCssSelector(uiObjects.loginDialog.selectorDialogMain)
    .isDisplayed()
    .then(value => console.log('login dialog show:', value ? 'pass' : 'fail'))
    .sleep(testConsts.waitTime.shortWait);
};

module.exports = {
  openBaiduLoginDialog,
}