function solve(arr) {

    const step = Number(arr[arr.length - 1]);
    arr.pop();

    let result = [];

    for (let i = 0; i < arr.length; i += step) {

       result.push(arr[i]);
    }

    return result.join('\n');
}

console.log(solve(['5', 
'20', 
'31', 
'4', 
'20', 
'2']
));

console.log(solve(['dsa',
'asd', 
'test', 
'tset', 
'2']
));

console.log(solve(['1', 
'2',
'3', 
'4', 
'5', 
'6']
))