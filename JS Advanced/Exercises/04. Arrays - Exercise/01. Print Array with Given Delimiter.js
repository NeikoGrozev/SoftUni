function solve(arr) {
    const delimiter = arr[arr.length - 1];

    arr.pop();

    return arr.join(delimiter);
}

console.log(solve(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-']
))

console.log(solve(['How about no?', 
'I',
'will', 
'not', 
'do', 
'it!', 
'_']
))