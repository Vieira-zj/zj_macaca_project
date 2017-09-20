/**
 * Hello world demo.
 * 
 */
'use strict';

let testPrintVar = function () {
    let name = 'zheng jin';
    console.log(`hello world, ${name}`);
};

let testPath = function () {
    const path = require('path');

    // path.join concatenates all given path segments together 
    // using the platform specific separator as a delimiter, then normalizes the resulting path.
    console.log('path.join:', path.join(__dirname, '../logs'));

    // path.resolve() process the sequence of paths from right to left, 
    // with each subsequent path prepended until an absolute path is constructed.
    console.log('path.resolve:', path.resolve(__dirname, '../logs', '/bar/bae'));
};

let testObject = function testObject() {
    let tmpBoolean = true;

    let testObject = {
        testBoolean1: tmpBoolean ? 'pass' : 'failed',
        testBoolean2: function () {
            let ret = tmpBoolean ? 'pass' : 'failed';
            return ret.toUpperCase();
        }
    }
    console.log('Object boolean1 value:', testObject.testBoolean1);
    console.log('Object boolean2 value:', testObject.testBoolean2());
};

let testFnName = function (fn) {
    console.log('funcion name:', fn.name);
    console.log('funcion name:', arguments[0].name);
};

let fnCaller = function (fn) {
    console.log('hello', fn());
};
let fnCallBack1 = function (text) {
    return text;
};
let testCallBack = function () {
    // must be within the same context
    let fnCallBack2 = function () {
        return nameText;
    };

    const nameText = 'zhengjin';

    // #1, call by anonymous function
    fnCaller(function () {
        return nameText;
    });
    // #2, call by function
    fnCaller(() => fnCallBack1(nameText));
    // #3, call by function variable
    fnCaller(fnCallBack2);
};

let testJsonLoad = function () {
    // auto convert json string (in file) to json object
    let loadJson = require('./package.json');
    console.log('load json:', typeof loadJson);
    console.log('project description:', loadJson.description);
}

if (require.main === module) {
    // testPrintVar();
    // testPath();
    // testObject();
    // testFnName(testPath);
    // testCallBack();
    testJsonLoad();
}