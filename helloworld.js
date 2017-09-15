/**
 * Hello world demo.
 * 
 */

var testPath = function () {
    const path = require('path');

    let pathFrom = '/Users/zhengjin/WorkSpaces';
    let pathTo = 'nodejs_workspace/zj_js_automation'
    console.log('path join:', path.join(pathFrom, pathTo));
    console.log('path resolve:', path.resolve(pathFrom, pathTo));
}

if (require.main === module) {
    let name = 'zheng jin';
    console.log(`hello world, ${name}`);

    testPath();
}