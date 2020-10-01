function solve(input) {
    let matrix = [];

    for (let i = 0; i < input.length; i++) {
        matrix[i] = [];

        let currentRow = input[i].split(' ');

        for (let row = 0; row < currentRow.length; row++) {
            matrix[i][row] = Number(currentRow[row]);
        }
    }

    let sumDiagonals = [0, 0];

    for (let row = 0; row < matrix.length; row++) {

        sumDiagonals[0] += matrix[row][row];
        sumDiagonals[1] += matrix[row][matrix.length - 1 - row];
    }

    if(sumDiagonals[0] === sumDiagonals[1]){
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix.length; col++) {
              
                if(row !== col && col !== matrix.length - 1 - row){
                    matrix[row][col] = sumDiagonals[0];
                }                
            }            
        }
    }

    matrix.forEach(x => console.log(x.join(' ')));
}

solve(
    [
        '5 3 12 3 1',
        '11 4 23 2 5',
        '101 12 3 21 10',
        '1 4 5 2 2',
        '5 22 33 11 1']
);

solve(['1 1 1',
'1 1 1',
'1 1 0']
);