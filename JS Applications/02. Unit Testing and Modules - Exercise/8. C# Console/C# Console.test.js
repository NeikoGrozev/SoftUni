const { assert } = require('chai');
const Console = require('./C# Console');

describe('static method writeLine', () => {
    it('should be check with empty arguments', () => {
        assert.notEqual(Console.writeLine, undefined);
        assert.equal(typeof Console.writeLine, 'function');
    });

    it('should be return message with input string', () => {
        let message = 'abc'

        assert.equal(Console.writeLine(message), message);
    })

    it('should be return message with input object', () => {
        let message = {
            a: 'abc',
            b: 2
        }

        assert.equal(Console.writeLine(message), JSON.stringify(message));
    })

    it('should be throw error with input not a string', () => {
        assert.throw(() => Console.writeLine(123, 'abc'), 'No string format given!');
    });

    it('should be throw error when the number of placeholders is not equal to the number of arguments', () => {
        assert.throw(() => Console.writeLine('The sum of {0} and {1} is {2}', 'zero', 'one'), 'Incorrect amount of parameters given!');
    });

    it('should be throw error when the index of a placeholder does not equal the number of arguments', () => {
        assert.throw(() => Console.writeLine('The sum of {0} and {1} is {3}', 'zero', 'one', 'one'), 'Incorrect placeholders given!');
    });

    it('should be return correct message', () => {
        assert.equal(Console.writeLine('The sum of {0} and {1} is {2}', '1', '2', '3'), 'The sum of 1 and 2 is 3');
    });
});