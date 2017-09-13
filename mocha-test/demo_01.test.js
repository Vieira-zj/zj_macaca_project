/**
 * Run command: make test-mocha-default
 * 
 */

var should = require('should');

var retZero = function () {
    return 0;
};

var retHello = function () {
    return 'hello';
};

describe('test/demo_01.test.js', function () {

    after(() => {
        console.log('all after');
    });

    describe('group 1', function () {
        it('test case 1', function () {
            retZero().should.equal(0);
        });

        after(() => {
            console.log('group 1 after');
        });
    });

    describe('group 2', function () {
        it('test case 2', function () {
            retHello().should.equal('hello');
        });

        after(() => {
            console.log('group 2 after');
        });
    });

});