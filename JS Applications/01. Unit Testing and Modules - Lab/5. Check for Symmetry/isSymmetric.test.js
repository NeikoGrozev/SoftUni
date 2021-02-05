let {assert} = require('chai');
let isSymmetric = require('./isSymmetric.js');

describe('isSymmetric', () => {
    it('should be return false', () => {
        let num = {};
        assert.equal(false, isSymmetric(num));
    });

    it('should be return true with symmetric array', () => {
        let arr = [1, 2, 3, 2, 1];
        assert.equal(true, isSymmetric(arr));
    })
});