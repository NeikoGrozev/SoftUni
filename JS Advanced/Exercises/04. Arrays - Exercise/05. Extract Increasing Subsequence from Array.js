function solve(arr) {

    let maxDigit = arr[0];
    let result = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] >= maxDigit) {

            result.push(arr[i]);
            maxDigit = arr[i];
        }
    }
    return result.join('\n')
}

console.log(solve([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24]
));

console.log(solve([1,
    2,
    3,
    4]
));

console.log(solve([20,
    3,
    2,
    15,
    6,
    1]
));