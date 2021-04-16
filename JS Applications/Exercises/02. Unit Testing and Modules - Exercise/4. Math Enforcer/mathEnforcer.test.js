let { assert } = require('chai');
let { addFive, subtractTen, sum } = require('./mathEnforcer.js');

describe('mathEnforcer', () => {
    describe('addFive', () => {
        it('should be return undefined', () => {
            let num = '5';
            assert.equal(undefined, addFive(num));
        });

        it('should be return 10', () => {
            let num = 5;
            assert.equal(10, addFive(5));
        });
    });

    describe('subtractTen', () => {
        it('should be return undefined', () => {
            let num = '10';
            assert.equal(undefined, subtractTen(num));
        });

        it('should be return 10', () => {
            let num = 11;
            assert.equal(1, subtractTen(num));
        });
    });

    describe('sum', () => {
        it('should be return undefined with incorrect num1', () => {
            let num1 = '5';
            let num2 = 10;
            assert.equal(undefined, sum(num1, num2));
        });

        it('should be return undefined with incorrect num2', () => {
            let num1 = 5;
            let num2 = '10';
            assert.equal(undefined, sum(num1, num2));
        });

        it('should be return 15', () => {
            let num1 = 5;
            let num2 = 10;
            assert.equal(15, sum(num1, num2));
        });
    })
})