/**
 * Run command: 
 * 1) make test-mocha-default
 * 2) npm test
 * 
 */

var should = require('should');

var retZero = function () {
    return 0;
};

var retHello = function () {
    return 'hello';
};

// mocha style as BDD
describe('test/demo_01.test.js, part 1', function () {
    this.timeout(2 * 1000); // as cmd option -t
    this.slow(1000); // as cmd option -s

    before('before: all', () => {
        console.log('all before, part1')
    });

    after('after: all', () => {
        console.log('all after, part1');
    });

    afterEach(() => console.log('all aftereach, part1'));

    // passing arrow functions (lambdas) to Mocha is discouraged. 
    // Lambdas lexically bind this and cannot access the Mocha context.
    describe('group 1', function () {
        this.timeout(500);

        after(() => {
            console.log('group 1 after');
        });

        it('test case 1', function () {
            retZero().should.be.equal(0);
        });
    });

    describe('group 2', function () {
        // this feature does re-run beforeEach/afterEach hooks but not before/after hooks.
        this.retries(1);

        after(() => {
            console.log('group 2 after');
        });

        afterEach(() => console.log('group 2 each case after'));

        it('test case 2', function () {
            retHello().should.be.equal('hello');
        });

        it('test case 3', function () {
            console.log('test failed!');
            retZero().should.be.equal(1);
        });
    });

    describe.skip('group 3, to be skip', function () {
        it('test case 4', function () {
            'abc'.should.be.match(/bc$/);
        });

        it('test case 5', function () {
            'abc'.should.match(/^ab/);
        });
    });
});

// mocha style as TDD
// suite('test/demo_01.test.js, part 2', function () {
//     suiteSetup(() => {
//         console.log('set up, part2');
//     });
    
//     suiteTeardown(() => {
//         console.log('tear down, part2');
//     });

//     suite('group 4', function () {
//         test('test case 5', function () {
//             'abc'.should.be.match(/bc$/);
//         });

//         test('test case 6', function () {
//             'abc'.should.match(/^ab/);
//         });
//     });
// });

describe('test/demo_01.test.js, part 3', function () {
    this.timeout(0); // disable timeouts

    // for async fn in mocha, we should pass a callback fn "done",
    // and call the done() in async fn to tell mocha that when async fn finished.
    it('test case 7, async function', function (done) {
        setTimeout(function () {
            console.log('async function in mocha test.');
            done();
        }, 2000);
    });

    context('not use done cases', function () {
        // promise
        retPromise = function () {
            return new Promise(function(resolve, reject) {
                setTimeout(() => {
                    console.log('promise in mocha test.');
                    resolve(true);
                }, 2000);
            });
        };
        
        it('test case 8, async promise function', function () {
            return retPromise().should.eventually.be.true();
        });

        // await
        /* jshint ignore:start */
        it('test case 9, async await function', async function () {
            let result = await retPromise();
            result.should.be.true();
        });
        /* jshint ignore:end */
    });
});

describe('test/demo_01.test.js, part 4', function () {
    // dync generate tests
    myAdd = function (args) {
        return args.reduce(function (prev, curr) {
            return prev + curr;
        }, 0);
    };

    var tests = [
        { args: [1, 2], expected: 3 },
        { args: [1, 2, 3], expected: 6 },
        { args: [1, 2, 3, 4], expected: 10 }
    ];

    tests.forEach(function (test) {
        it('correctly adds ' + test.args.length + ' args', function () {
            myAdd(test.args).should.be.equal(test.expected)
        });
    });
});