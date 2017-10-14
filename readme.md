# **Macaca学习笔记**

## 前言

之前一直在TesterHome潜水，受益非浅，所以也决定写点东西与大家分享。

因工作关系，最近开始学习Macaca, 在网上找了一下，没有文章详细地介绍Macaca, 自己主要是参考官方的例子（很全面，但入门有点难），所以在此总结一下。

## **环境**

开发环境：Mac OS + Visual Studio Code + Macaca 2.0.9 + Chrome 61.0.xxxx

语言：JavaScript.

Macaca环境配置确实是有些麻烦，但不难，网上介绍文章很多，在这就不说了。

## 项目结构

项目中比较重要目录和文件（Git库地址见文章最后）：

Mocha-test: 包括Mocha和Should的测试demo. 因为Macaca默认是基于Mocha来执行的，断言我使用的是Should.

Macaca-test: 包括Macaca测试用例demo. 

run-test.sh: 测试执行脚本，具体配置在Makefile中。

下面直接上代码。

## 代码说明

### driver初始化

从wd (web driver)获得一个driver对象。

```javascript
    var driver = wd.promiseChainRemote({
        host: 'localhost',
        port: process.env.MACACA_SERVER_PORT || 3456
    });
```

初始化driver对象。

```javascript
        return driver
            .init({
                platformName: 'desktop',
                browserName: testConsts.envVars.browser,
                userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent',
                deviceScaleFactor: 2
            })
            .setWindowSize(1280, 800);
```

以上直接从官方例子中copy过来的，大家知道这么用就行了。

### Driver API说明

自己使用比较多且比较有用的API, 包括如下几个：

**1) waitForElement**

function waitForElement(using, value, asserter, timeout, interval) { … }

查找元素，默认timeout=1000ms, interval=200ms. 比如waitForElementById(), waitForElementByCssSelector(). 

一般加一个元素的定位条件就可以使用，我比较喜欢按如下方式调用：

```javascript
.waitForElementById('kw', wd.asserters.isDisplayed, 8 * 1000, 500)
```

即指明waitFor的条件是isDisplayed, 然后timeOut和interval根据实现情况自定义。

asserters条件包括：isDisplayed, nonEmptyText, textInclude(text), jsCondition(jsExpr)

但是使用jsCondition(jsExpr)的过程中一直会pending, 不知道是什么原因！

注：因为Macaca用例的执行是基于事件驱动的，而不是实际摸拟操作，所以执行的速度非常快，所以尽量使用waitForElementById函数，而不是直接使用elementById函数，确保元素可见之后再操作。个人使用一段时间感觉元素定位还是非常稳定的。

**2) waitForElements**

调用方式与waitForElement函数相似，但因为Macaca是链式调用，所以waitForElements的使用方法不同，如下：

```javascript
.waitForElementsByCssSelector('input[type="text"]')
.then(function (els) {
  console.log('element input count:', els.length);
  return els[0];
})
.sendKeys('test')
```

**3) execute(jsExpr)**

向当前页面注入js脚本并执行。比如执行mouse hover操作：

```javascript
// 使用原生JS
    .execute(
        `
        var element = document.querySelector('${cssSelector}');
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent('mouseover', true, true);
        element.dispatchEvent(event);
        `
      )
// 使用JQuery
    .execute(`$('a[name="tj_settingicon"]').mouseover();`);
```

另外一个比较好用的功能是执行JS脚本后，可获得返回值。如下脚本取一个元素的text并打印。

（注：我只验证过简单类型，如string, boolean, 对象类型未验证）

```javascript
// 获取元素Text
.execute(`
    var uiElement = document.getElementById('setf');
    uiElement.style.backgroundColor="#000000";
    return uiElement.innerText;`)
.then(value => console.log('link text by JS return:', value))
// 使用JQuery获取元素属性值
.execute(`return $('input#su').attr('value');`)
```

现在浏览器基本都支持JQuery, 所以尽量使用JQuery, 要简单很多。

**4) 模拟键盘操作**

常用的keycodes:

```javascript
const keyCodes = {
  Backspace: '\uE003',
  Tab: '\uE004',
  Enter: '\uE007',
  Shift: '\uE008',
  Control: '\uE009',
  ArrowLeft: '\uE012',
  ArrowUp: '\uE013',
  ArrowRight: '\uE014',
  ArrowDown: '\uE015',
  Delete: '\uE05D',
};
```

使用：

```javascript
.keys(testConsts.keyCodes.Enter)
.keys(testConsts.keyCodes.Backspace)
.keys(testConsts.keyCodes.Shift + testConsts.keyCodes.ArrowLeft)
```

注：发送键盘事件在我本地测试只能使用keys(), 使用sendKeys()无效。

### 图片对比验证

下面是一个使用图片对比验证的例子。

```javascript
        const diffImage = require('./utils.js').diffImage;
        it('#3, verification by diff image', function () {
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
```

结果是基于对比origin图片和actual图片差异的diff图片。图片对比为像素级别，个人觉得是非常强大，非常方便的一个功能。

### 添加自定义函数

大家可以看到，Macaca JS是使用函数式编程，因此不能用传统的方式来添加自定义函数。添加自定义函数要使用如下方式：

```javascript
  wd.addPromiseChainMethod('returnHelloMessage', function () {
    return 'hello world';
  });
```

第一个参数为自定义函数的名称；第二个参数是一个回调函数，里面为具体的函数功能。

## 总结

先写这么多，主要写了一些自己觉得比较有用的东西，其实还有很多细节上的东西，完整的例子大家可以自己看代码。项目中，自动化测试用例大部分都是基于Baidu首页来写的，本地都能执行通过。但因为是demo, 有些不严谨的地方大家就别纠结了，呵！

非常感谢大家耐心读完本篇文章，欢迎提问，谢谢！

最后贴上Git项目地址：

https://github.com/Vieira-zj/ZjJsAutomation
