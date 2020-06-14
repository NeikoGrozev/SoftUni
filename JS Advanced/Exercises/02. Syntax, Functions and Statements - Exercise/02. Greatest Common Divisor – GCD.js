function solve(a, b){
    const smallDigit = Math.min(a, b);
    let divisor = 1;

    for (let i = 1; i <= smallDigit; i++) {
        
        if(a % i == 0 && b % i == 0){
            divisor = i;
        }        
    }

    console.log(divisor);
}

solve(15, 5)
solve(2154, 458)