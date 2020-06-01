function solve(arr) {

    let isMagic = true;
    let sumOne = 0;
    let sumTwo = 0;

    for (let i = 0; i < arr.length - 1; i++) {

        sumOne = arr[i].reduce((a, b) => a + b);
        sumTwo = arr[i + 1].reduce((a, b) => a + b);

        if (sumOne !== sumTwo) {

            isMagic = false;
            break;
        }
    }

    if (isMagic) {

        for (let i = 0; i < arr.length - 1; i++) {

            sumOne = 0;
            sumTwo = 0;

            for (let j = 0; j < arr.length; j++) {

                sumOne += arr[j][i];
                sumTwo += arr[j][i + 1];
            }

            if (sumOne !== sumTwo) {
                
                isMagic = false;
                break;
            }
        }
    }

    return isMagic;
}

console.log(solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));

console.log(solve([[11, 32, 45],
[21, 0, 1],
[21, 1, 1]]
));

console.log(solve([[1, 0, 0],
[0, 0, 1],
[0, 1, 0]]
));