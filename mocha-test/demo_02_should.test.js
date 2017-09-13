/**
 * Should api documents:
 * https://shouldjs.github.io/
 * 
 */

var should = require('should');
var assert = require('assert');

describe('test/demo_02_should.test.js', function () {

    it('Should demo 01, equal', function () {
        (10).should.be.eql(10);
        ('10').should.not.be.eql(10);

        (10).should.be.equal(10);
        ('a').should.be.exactly('a');
    });

    it('Should demo 02, contains', function () {
        [1, 2, 3].should.containEql(2);
        'abc'.should.containEql('c');
    });

    it('Should demo 03, error', function () {
        let fn1 = function () {
            console.log('call fn1');
            throw new Error('fail');
        };
        fn1.should.throw();

        (function () {
            throw new Error('fail');
        }).should.throw('fail');
    });

    it('Should demo 04, number', function () {
        (10).should.be.above(1);
        (10).should.be.aboveOrEqual(10);
        (10).should.be.below(20);

        (10).should.be.within(10, 20);
    });

    it('Should demo 05, string', function () {
        'abcd'.should.be.startWith('a');
        'abcd'.should.be.endWith('d');
    });

    it('Should demo 06, property', function () {
        ''.should.be.empty();
        [].should.be.empty();

        ({
            a: 10
        }).should.have.keys('a');
        ({
            a: 10,
            b: 20
        }).should.have.keys('a', 'b');

        [1, 2].should.have.length(2);

        ({
            a: 10
        }).should.have.ownProperty('a');
    });

    it('Should demo 07, boolean', function () {
        assert.ok(true);

        (true).should.be.ok();
        (false).should.be.false();
    });

    it('Should demo 08, type', function () {
        (10).should.be.a.Number();
        'abc'.should.be.a.String();
        [1, 2].should.be.a.Array();

        (() => {
            console.log('test');
        }).should.be.Function();

        var tmpObj = {
            firstName: 'zheng',
            lastName: 'jin'
        }
        tmpObj.should.be.a.Object();
    });

    it('Should dmoe 09, match', function () {
        'abc'.should.be.a.String().and.not.empty().and.match(/^ab/);
    });

});