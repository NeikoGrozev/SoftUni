function solve(input) {

    let arr = [[false, false, false],
    [false, false, false],
    [false, false, false]];

    let firstPlayer = true;

    for (const line of input) {

        let [currRow, currCol] = line.split(' ').map(Number);

        if (arr[currRow][currCol] !== false) {
            console.log("This place is already taken. Please choose another!");
            continue;
        } else if (firstPlayer) {
            arr[currRow][currCol] = 'X';
            firstPlayer = false;
        } else {
            arr[currRow][currCol] = 'O';
            firstPlayer = true;
        }
        for (let i = 0; i < 3; i++) {

            if (arr[0][i] !== false && arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i]) {
                printWin(arr[0][i]);
                printMatrix();
                return;
            } else if (arr[i][0] !== false && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
                printWin(arr[i][0]);
                printMatrix();
                return;
            }
        }

        if (arr[0][0] !== false && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
            printWin(arr[0][0]);
            printMatrix();
            return;
        } else if (arr[0][2] !== false && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
            printWin(arr[0][2]);
            printMatrix();
            return;
        }

        let isTrue = false;

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].includes(false)) {
               isTrue = true;
            } else {
                isTrue = false;
            }
        }

        if(isTrue){
            console.log('The game ended! Nobody wins :(');
            printMatrix();
            return;
        }
    }

    function printWin(player) {
        console.log(`Player ${player} wins!`)

    }

    function printMatrix() {
        for (let row = 0; row < arr.length; row++) {
            console.log(arr[row].join('\t'));
        }
    }
}

// solve(
//     ["0 1",
//         "0 0",
//         "0 2",
//         "2 0",
//         "1 0",
//         "1 1",
//         "1 2",
//         "2 2",
//         "2 1",
//         "0 0"]
// );

// solve(["0 0",
//     "0 0",
//     "1 1",
//     "0 1",
//     "1 2",
//     "0 2",
//     "2 2",
//     "1 2",
//     "2 2",
//     "2 1"]
// );

solve(
    ["0 1",
        "0 0",
        "0 2",
        "2 0",
        "1 0",
        "1 2",
        "1 1",
        "2 1",
        "2 2",
        "0 0"]

);