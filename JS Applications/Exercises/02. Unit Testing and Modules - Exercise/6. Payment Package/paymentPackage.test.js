const { assert } = require('chai');
const PaymentPackage = require('./paymentPackage');

describe('PaymentPackage', () => {
    let package;
    beforeEach(() => {
        package = new PaymentPackage('ABC', 10);
    })

    describe('constructor', () => {
        it('should be return correct data', () => {
            assert.equal(package.name, 'ABC');
            assert.equal(package.value, 10);
            assert.equal(package.VAT, 20);
            assert.equal(package.active, true)
        });
    });

    describe('set name property', () => {
        it('should be return throw with incorrect input type', () => {
            assert.throw(() => new PaymentPackage(10, 10), 'Name must be a non-empty string');
        });

        it('should be return throw with empty string', () => {
            assert.throw(() => new PaymentPackage('', 10), 'Name must be a non-empty string');
        });
    });

    describe('set value property', () => {
        it('should be return throw with incorrect input type', () => {
            assert.throw(() => new PaymentPackage('ABC', 'test'), 'Value must be a non-negative number');
        });

        it('should be return throw with negative value', () => {
            assert.throw(() => new PaymentPackage('ABC', -1), 'Value must be a non-negative number');
        });
    });

    describe('set VAT property', () => {
        it('should be return throw with incorrect input type', () => {
            assert.throw(() => package.VAT = '1', 'VAT must be a non-negative number');
        });

        it('should be return throw with negative value', () => {
            assert.throw(() => package.VAT = -1, 'VAT must be a non-negative number');
        });
    });

    describe('set active property', () => {
        it('should be return throw with incorrect input type', () => {
            assert.throw(() => package.active = 'true', 'Active status must be a boolean');
        });
    });

    describe('toString', () => {
        it('should be return correct data', () => {
            let expected = [`Package: ${package.name}` + (package.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${package.value}`,
            `- Value (VAT ${package.VAT}%): ${package.value * (1 + package.VAT / 100)}`
            ].join('\n');

            assert.equal(package.toString(), expected);
        });
    });
});