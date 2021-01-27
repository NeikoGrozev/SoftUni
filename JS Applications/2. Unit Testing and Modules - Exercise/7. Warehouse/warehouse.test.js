let { assert } = require('chai');
let Warehouse = require('./warehouse');

describe('Warehouse', () => {
    let instance;
    beforeEach(() => {
        instance = new Warehouse(10);
    });

    describe('constructor', () => {
        it('get capacity property', () => {
            assert.equal(instance.capacity, 10);
        });

        it('should be return type object', () => {
            assert.equal(typeof instance.availableProducts.Food, 'object');
            assert.equal(typeof instance.availableProducts.Drink, 'object');
        })

        it('should be throw with incorrect type capacity', () => {
            assert.throw(() => new Warehouse('10'), 'Invalid given warehouse space');
        });

        it('should be throw with incorrect negative number', () => {
            assert.throw(() => new Warehouse(-10), 'Invalid given warehouse space');
        });

    });

    describe('addProduct', () => {
        it('should be return correct data with food product', () => {
            assert.equal(JSON.stringify(instance.addProduct('Food', 'Bread', 2)), '{"Bread":2}')
        });

        it('should be return correct data with drink product', () => {
            assert.equal(JSON.stringify(instance.addProduct('Drink', 'Water', 1)), '{"Water":1}')
        });

        it('should be throw error with full capacity', () => {
            let temp = new Warehouse(1);
            temp.addProduct('Food', 'Bread', 1);

            assert.throw(() => temp.addProduct('Drink', 'Water', 1), 'There is not enough space or the warehouse is already full');
        });
    });

    describe('orderProducts', () => {
        it('should be return correct data with food product', () => {
            instance.addProduct('Food', 'Bread', 2);
            assert.equal(JSON.stringify(instance.orderProducts('Food')), '{"Bread":2}')
        });

        it('should be return correct data with drink product', () => {
            instance.addProduct('Drink', 'Water', 1);
            assert.equal(JSON.stringify(instance.orderProducts('Drink')), '{"Water":1}');
        });

        it('should be throw with incorrect data', () => {
            instance.addProduct('Drink', 'Water', 1);
            assert.throw(() => instance.orderProducts('Drinks'), 'Cannot convert undefined or null to object');
        });
    });

    describe('occupiedCapacity', () => {
        it('should be return correct data', () => {
            instance.addProduct('Drink', 'Water', 5);
            assert.equal(instance.occupiedCapacity(), 5);
        });

        it('should be return correct data with empty products', () => {
            assert.equal(instance.occupiedCapacity(), 0);
        });
    });

    describe('revision', () => {
        it('should be return warehouse is empty', () => {
            assert.equal(instance.revision(), 'The warehouse is empty');
        });

        it('should be return correct data', () => {
            instance.addProduct('Drink', 'Water', 5);
            assert.equal(instance.revision(), 'Product type - [Food]\nProduct type - [Drink]\n- Water 5');
        });
    });

    describe('scrapeAProduct', () => {
        it('should be return correct data with correct quantity', () => {
            instance.addProduct('Drink', 'Water', 5);
            assert.equal(JSON.stringify(instance.scrapeAProduct('Water', 4)), '{"Water":1}');
        });

        it('should be return correct data with incorrect quantity', () => {
            instance.addProduct('Drink', 'Water', 5);
            assert.equal(JSON.stringify(instance.scrapeAProduct('Water', 6)), '{"Water":0}');
        });

        it('should be throw error', () => {
            assert.throw(() => instance.scrapeAProduct('Water', 6), 'Water do not exists');
        })
    })
});