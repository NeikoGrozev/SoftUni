function solve(arr) {
    let result = [];

    arr.forEach(element => {
        element < 0 ? result.unshift(element) : result.push(element)
    });

    return result.join('\n');
}

console.log(solve([7, -2, 8, 9]))
console.log(solve([3, -2, 0, -1]))