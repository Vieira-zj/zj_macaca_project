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

describe('test/demo_01.test.js, part 1', function () {
    this.timeout(2 * 1000); // as cmd option -t
    this.slow(1000); // as cmd option -s

    after(() => {
        console.log('all after, part1');
    });

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
        after(() => {
            console.log('group 2 after');
        });

        afterEach(() => console.log('group 2 each case after'));

        it('test case 2', function () {
            retHello().should.be.equal('hello');
        });

        it('test case 3', function () {
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

describe('test/demo_01.test.js, part 2', function () {
    after(() => {
        console.log('all after, part2');
    });

    describe('group 4', function () {
        it('test case 5', function () {
            'abc'.should.be.match(/bc$/);
        });

        it('test case 6', function () {
            'abc'.should.match(/^ab/);
        });
    });
});

describe('test/demo_01.test.js, part 3', function () {
    // for async fn in mocha, we should pass a callback fn "done",
    // and call the done() in async fn to tell mocha that when async fn finished.
    it('test case 7, async function', function (done) {
        setTimeout(function () {
            console.log('async function in mocha.');
            done();
        }, 2000);
    });

    // For async tests and hooks, ensure "done()" is called; 
    // if returning a Promise, ensure it resolves.
});