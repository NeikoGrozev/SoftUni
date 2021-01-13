let {assert} = require('chai');
const StringBuilder = require('./stringBuilder.js');
let StringBulder = require('./stringBuilder.js');

describe('stringBuilder', () => {
    let sb;
    beforeEach(() => {
        sb = new StringBuilder();
    })
    describe('_vrfyParam', () => {
        it('should be return throw error with incorrect data', () => {
            let num = 5;
            assert.throws(() => new StringBulder(num), 'Argument must be а string');
        })
    });

    describe('constructor', () => {
        it('should be return correct data with empty string', () => {           
            assert.equal('', sb.toString());
        });

        it('should be return correct data', () => {
            let sb = new StringBuilder('Pesho');
            assert.equal('Pesho', sb.toString());
        })
    });

    describe('append', () => {
      it('should be append string', () => {
        sb.append('T');
        assert.equal('T', sb.toString());
      });
    });

    describe('prepend', () => {
        it('should be prepend string', () => {
          sb.append('est');
          sb.prepend('T')
          assert.equal('Test', sb.toString());
        });
      });

      describe('insertAt', () => {
        it('should be insertAt string', () => {
          sb.append('Tt');
          sb.insertAt('es', 1)
          assert.equal('Test', sb.toString());
        });
      });

      describe('remove', () => {
        it('should be remove string', () => {
          sb.append('new Test');
          sb.remove(0, 4)
          assert.equal('Test', sb.toString());
        });
      });
});