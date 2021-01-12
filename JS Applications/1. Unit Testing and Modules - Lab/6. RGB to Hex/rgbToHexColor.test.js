let {assert} = require('chai');
let app = require('./rgbToHexColor.js');

describe('rgbToHexColor', () => {
    it('should be return undefined', () => {
        assert.equal(undefined, app(-1, 100, 100));
        assert.equal(undefined, app(256, 100, 100));
        assert.equal(undefined, app(100, -1, 100));
        assert.equal(undefined, app(100, 256, 100));
        assert.equal(undefined, app(100, 100, -1));
        assert.equal(undefined, app(100, 100, 256));
        assert.equal(undefined, app('1', 100, 100));
        assert.equal(undefined, app(100, '1', 100));
        assert.equal(undefined, app(100, 100, '1'));
    })

    it('should be return currect data', () => {
        assert.equal('#656565', app(101, 101, 101) )
    })
})
