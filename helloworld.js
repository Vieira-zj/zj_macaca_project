/**
 * Hello world demo.
 * 
 */

var testPath = function () {
    const path = require('path');

    console.log(__dirname);
    console.log(path.resolve(__dirname, '../screenshot'));
}

if (require.main === module) {
    let name = 'zheng jin';
    console.log(`hello world, ${name}`);

    testPath();
}