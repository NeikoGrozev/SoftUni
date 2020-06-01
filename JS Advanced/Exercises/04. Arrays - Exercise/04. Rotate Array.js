function solve(arr) {

    const rotate = Number(arr.pop()) % arr.length;

    for (let i = 0; i < rotate; i++) {

        let item = arr.pop();
        arr.unshift(item);
    }

    return arr.join(' ')
}

console.log(solve(['1',
    '2',
    '3',
    '4',
    '2']
));

console.log(solve(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15']
));