function solve(matrix) {

    let leftDiagonal = 0;
    let rightDiagonal = 0;

    for (let row = 0; row < matrix.length; row++) {

        leftDiagonal += matrix[row][row];
        rightDiagonal += matrix[row][matrix.length - 1 - row];
    }

    let result = [leftDiagonal, rightDiagonal];

    return result.join(' ');
}

console.log(solve([[20, 40],
[10, 60]]
))

console.log(solve([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]]
))