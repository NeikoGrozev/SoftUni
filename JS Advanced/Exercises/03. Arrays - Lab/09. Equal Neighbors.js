  function solve (matrix) {

    let count = 0;

    for (let row = 0; row < matrix.length-1; row++) {

        for (let col = 0; col < matrix[row].length; col++) {

            if (matrix[row][col] === matrix[row+1][col]){

                count++;
            }
            if (matrix[row][col] === matrix[row][col+1]){

                count++;
            }
            if (row === matrix.length-2) {

                if (matrix[row+1][col] === matrix[row+1][col+1]) {

                    count++;
                }
            }
        }
    }
    return count;
}

console.log(solve([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']]
))

console.log(solve([
    ['test', 'yes', 'yo', 'ho'],
    ['well', 'done', 'yo', '6'],
    ['not', 'done', 'yet', '5']]
))

console.log(solve([
    ['2', '2', '5', '7', '4'],
    ['4', '0', '5', '3', '4'],
    ['2', '5', '5', '4', '2']]));


