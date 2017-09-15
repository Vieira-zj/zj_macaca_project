/**
 * Include common UI tasks invoked by auto test cases.
 * 
 */

const uiObjects = require('./test_uiobjects');

const openBaiduLoginDialog = function (driver) {
  // click login and wait for dialog
  return driver
    .waitForElementByCssSelector(uiObjects.baiduMainPage.selectorLoginLink)
    .click()
    .sleep(2000)
    .waitForElementByCssSelector(uiObjects.loginDialog.selectorDialogMain)
    .isDisplayed()
    .then(value => console.log('login dialog show:', value ? 'pass' : 'fail'))
    .sleep(1000);
};

module.exports = {
  openBaiduLoginDialog,
}