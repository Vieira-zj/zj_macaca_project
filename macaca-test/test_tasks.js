/**
 * Include common UI tasks invoked by auto test cases.
 * 
 */

const openBaiduLoginDialog = function (driver) {
  // click login and wait for dialog
  return driver
    .waitForElementByCssSelector('div#u1 > a[name=tj_login]')
    .click()
    .sleep(2000)
    .waitForElementByCssSelector('div#passport-login-pop-dialog')
    .isDisplayed()
    .then(value => console.log('login dialog show:', value ? 'pass' : 'fail'))
    .sleep(1000);
};

module.exports = {
  openBaiduLoginDialog,
}
