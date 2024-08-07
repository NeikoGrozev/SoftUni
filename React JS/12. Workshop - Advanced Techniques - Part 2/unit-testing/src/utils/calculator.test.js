import * as calculator from './calculator';

describe('Calculator Sum', () => {
    test('sum of positive numbers should be positive', () => {
        //Arrange
        const first = 1;
        const second = 2;
        const expectedResult = 3;

        //Act
        const actualResult = calculator.sum(first, second);

        //Assert
        expect(actualResult).toBe(expectedResult);
    });

    test('negative number when adding negative number', () => {
        expect(calculator.sum(-1, -2).toBe(-3));
    });
});

describe('Calculator Divide', () => {
    test('Should throw error when divide by zero', () => {
        expect(() => calculator.divide(2, 0)).toThrow('Division by zero is not permited');
    });
});