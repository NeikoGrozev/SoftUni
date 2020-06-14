function solve(input) {
    
    let isEqual = true;
    const str = input.toString();
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i]);

        if (str[i] != str[i + 1] && i != str.length - 1) {
            isEqual = false
        }
    }
    console.log(isEqual);
    console.log(sum);
}

solve(2222222)
solve(1234)