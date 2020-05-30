function solve(matrix) {

    let maxDigit = Math.max(...matrix.reduce((a, b) => [...a, ...b]))

    return maxDigit;
}

console.log(solve([[20, 50, 10],
[8, 33, 145]]
))

console.log(solve([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]
   ))