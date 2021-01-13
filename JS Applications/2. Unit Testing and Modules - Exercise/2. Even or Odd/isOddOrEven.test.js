let { assert } = require('chai');
let app = require('./isOddOrEven');

describe('isOddOrEven', () => {
    it('should be return undefined', () => {
        let obj = {};
        assert.equal(undefined, app(obj));
    })

    it('should be return even', () => {
        let strEven = 'word';
        assert.equal('even', app(strEven));
    })

    it('should be return odd', () => {
        let strOdd = 'words';
        assert.equal('odd', app(strOdd));
    })

    it('should be return even with empty string', () => {
        let str = '';
        assert.equal('even', app(str));
    })
})