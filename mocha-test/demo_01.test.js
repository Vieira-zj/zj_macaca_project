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
            retZero().should.be.equal(0);
        });

        after(() => {
            console.log('group 1 after');
        });
    });

    describe('group 2', function () {
        it('test case 2', function () {
            retHello().should.be.equal('hello');
        });

        xit('test case 3, to be pending', function () {
            retZero().should.be.equal(1);
        });

        after(() => {
            console.log('group 2 after');
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