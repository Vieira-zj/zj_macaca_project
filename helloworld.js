/**
 * Hello world demo.
 * 
 */

var testPath = function () {
    const path = require('path');

    // path.join concatenates all given path segments together 
    // using the platform specific separator as a delimiter, then normalizes the resulting path.
    console.log('path.join:', path.join(__dirname, '../logs'));

    // path.resolve() process the sequence of paths from right to left, 
    // with each subsequent path prepended until an absolute path is constructed.
    console.log('path.resolve:', path.resolve(__dirname, '../logs', '/bar/bae'));
}

var testObject = function () {
    let tmpBoolean = true;

    let testObject = {
        testBoolean1: tmpBoolean ? 'pass' : 'failed',
        testBoolean2: function () {
            var ret = tmpBoolean ? 'pass' : 'failed';
            return ret.toUpperCase();
        }
    }
    console.log('Object boolean1 value:', testObject.testBoolean1);
    console.log('Object boolean2 value:', testObject.testBoolean2());
}

if (require.main === module) {
    let name = 'zheng jin';
    console.log(`hello world, ${name}`);

    testPath();
    testObject();
}