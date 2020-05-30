function solve(n, k) {
    
    let result = [1];

    for (let i = 0; i < n; i++) {
        let sum = 0;

        for (let j = 0; j < k; j++) {

            const currentItem = result[result.length - 1 - j];

            currentItem !== undefined ? sum += currentItem : void (0);
        }

        result.push(sum);
    }

    result.pop();

    return result.join(' ');
}

console.log(solve(6, 3))
console.log(solve(8, 2))