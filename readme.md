# **Macaca学习笔记**

## 前言

之前一直在TesterHome上潜水，也是受益非浅，所以也决定写点东西与大家分享。

工作关系，最近开始学习Macaca, 在网上找了一下，没有文章系统地介绍如何使用Macaca, 自己花了2周左右的时间研究了一下Macaca这个测试工具，主要是参考官方的例子（很全面，但入门有点难），在此总结一下。

## **环境**

Mac OS + Visual Studio Code + Macaca 2.0.9 + Chrome 61.0.xxxx

语言使用的是JavaScript.

Macaca环境配置确实是有些麻烦，但网上介绍文章很多，在这就不说了。

## 项目结构

代码结构比较简单：

Mocha-test: 因为Macaca默认是基于Mocha来执行的，断言我使用的是Should, 所以这个目录下包括Mocha和Should的测试demo.

Macaca-test: 包括Macaca测试用例子demo.

MakeFile: 定义Mocha和Macaca执行任务的Target.

run-test.sh: 执行MakeFIle中的Target. 执行测试时，只需要简单的配置run-test.sh文件，然后执行命令：source run-test.sh

下面直接上代码。

## 代码说明

### driver初始化

从wd (web driver)获得一个driver对象

```javascript
    var driver = wd.promiseChainRemote({

        host: 'localhost',

        port: process.env.MACACA_SERVER_PORT || 3456

    });
```

初始化driver对象

```javascript
        return driver

            .init({

                platformName: 'desktop',

                browserName: testConsts.envVars.browser,

                userAgent: `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0 Safari/537.36 Macaca Custom UserAgent`,

                deviceScaleFactor: 2

            })

            .setWindowSize(1280, 800);
```

以上直接从官方例子中copy过来的，大家知道这么用就行了。

### Driver API说明

自己使用比较多，觉得比较有用的API, 包括如下几个：

**1) waitForElement**

function waitForElement(using, value, asserter, timeout, interval) {}

查找元素，比如waitForElementById(), waitForElementByCssSelector(), 一般加一个元素的定位条件就可以使用，但有2个问题，1) 你不知道它waitFor的条件是什么，是等待元素available（属性是hidden的，不可见）还是visible, 2)默认的查找超时是1秒，非常短。因此我比较喜欢按如下方式使用：

```javascript
.waitForElementById('kw', wd.asserters.isDisplayed, timeOut, interval)

```

即指明waitFor的条件是可见，然后timeOut, 和interval(轮询间隔)根据实现情况自定义。

asserts条件包括：isDisplayed, nonEmptyText, textInclude(text), jsCondition(jsExpr)

但是jsCondition(jsExpr)在执行的过程中一直会pending, 不知道是什么原因。

**2) execute(jsExpr)**

比如执行mouse hover操作

  

```javascript
    .execute(

        `

        var element = document.querySelector('${cssSelector}');

        var event = document.createEvent('MouseEvent');

        event.initMouseEvent('mouseover', true, true);

        element.dispatchEvent(event);

        `

      )
```

另外一个比较好用的功能是执行JS脚本后，可返回值。如下脚本取一个元素的text并打印。

（注：我只验证过简单类型，如string, boolean, 对象类型未验证）

```javascript
                .execute(`

                    var uiElement = document.getElementById('setf');

                    uiElement.style.backgroundColor="#000000";

                    return uiElement.innerText;`)

                .then(value => console.log('link text by JS return:', value))
```

**3) 模拟键盘操作**

常用的keycodes

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

注意：发送键盘事件本地测试只能使用keys(), 使用sendKeys()无效。

### 图片对比验证

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

上面的图片对比到像素级别，个人觉得还是非常方便的一个功能。

### 添加自定义函数

大家可以看到，Macaca JS是使用函数式编程，因此不能用传统的方式来添加自定义函数。添加自定义函数要使用如下方式：

比如添加一个自定义的元素查找方法

```javascript
  wd.addPromiseChainMethod('waitForElementByCssSelectorByDefault', function (id) {

    return this.waitForElementByCssSelector(

      id,

      wd.asserters.isDisplayed,

      testConsts.waitTime.timeOutForSearch,

      testConsts.waitTime.intervalForSearch);

  });
```

第一个参数为自定义函数的名称，第二个是一个回调函数，里面为具体的自定义函数功能。

注：this为上下文对象，也就是driver, 方法中必须return返回。顺便说一下，因为是函数式编程，所以大家会发现在用例中，自定义函数中，Mocha hook方法中（before(), beforeEach()）,都必须返回上下文对象。

再提一下用例的执行，是事件驱动，而不是实际摸拟操作，所以执行的速度非常快，但根据最近的使用情况来看，使用waitForElement方法还是还是非常稳定的。

## 总结

今天先写这么多，主要是如何使用Macaca, 写了一些自己觉得比较有用的东西，其实还有很多细节上的东西，完整的项目代码大家可以到Git库上看。

（注：项目中，自动化demo大部分都是基于百度首页来写的，本地都执行通过。但因为是demo, 有些不严谨的地方大家就别纠结了，呵！）

后面会讲一下自己是如何优化的，比如按page object方式来分层，分离测试数据等。

非常感谢大家耐心读完本篇文章，欢迎提问，谢谢！

最后贴上Git项目地址：

https://github.com/Vieira-zj/ZjJsAutomation

