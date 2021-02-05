let { assert } = require('chai');
let { add, subtract, get } = require('./createCalculator.js');

describe('createCalculator', () => {
    describe('get', () => {
        it('should be return 0', () => {
            assert.equal(0, get());
        })
    })
    describe('add', () => {
        it('should be return 5', () => {
            add(5);
            assert.equal(5, get());
        })
    })

    describe('subtract', () => {
        it('should be return 4', () => {
            subtract(1);
            assert.equal(4, get());
        })
    })
})