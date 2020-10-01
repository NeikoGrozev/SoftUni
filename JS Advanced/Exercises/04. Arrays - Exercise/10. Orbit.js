function solve(input){

    const rows = input[0];
    const cols = input[1];
    const positionX = input[2];
    const positionY = input[3];
    
    let matrix = [];

    for (let row = 0; row < rows; row++) {

        matrix[row] = [];

        for (let col = 0; col < cols; col++) {
            if(positionX === row && positionY === col){
                matrix[row][col] = 1;
            } else {
                matrix[row][col] = Math.max(Math.abs(positionX - row), Math.abs(positionY - col)) + 1;
            }            
        }        
    }

    matrix.forEach(x => console.log(x.join(' ')));
}

solve(
    [4, 4, 0, 0]
);

solve(
    [5, 5, 2, 2]
);

solve(
    [3, 3, 2, 2]
);