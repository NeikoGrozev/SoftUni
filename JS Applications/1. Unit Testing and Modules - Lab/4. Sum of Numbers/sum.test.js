let { assert } = require('chai');
let sum = require('./sum.js')

describe('sum', () => {
    it('should be return sum 6', () => {
        let arr = [1, 2, 3];
        assert.equal(6, sum(arr));
    });

    it('should be return currect sum for one number', () => {
        let arr = [1];
        assert.equal(1, sum(arr));
    });

    it('should be return 0',() => {
        let arr = [];
        assert.equal(0, sum(arr));
    })
});