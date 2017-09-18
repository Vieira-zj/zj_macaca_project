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

if (require.main === module) {
    let name = 'zheng jin';
    console.log(`hello world, ${name}`);

    testPath();
}