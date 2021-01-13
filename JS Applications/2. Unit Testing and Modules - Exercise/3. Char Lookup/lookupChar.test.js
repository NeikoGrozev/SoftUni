let { assert } = require('chai');
let app = require('./lookupChar');

describe('lookupChar', () => {
    it('should be return undefined with incorrect string', () => {
        let str = 11;
        let index = 0;
        assert.equal(undefined, app(str, index));
    });

    it('should be return undefined with incorrect data index', () => {
        let str = 'word';
        let index = 'index';
        assert.equal(undefined, app(str, index));
    });

    it('should be return Incorrect index with incorrect index', () => {
        let str = 'word';
        let index = 10;
        assert.equal('Incorrect index', app(str, index));
    });

    it('should be return correct char', () => {
        let str = 'word';
        let index = 0;
        assert.equal('w', app(str, index));
    });
})