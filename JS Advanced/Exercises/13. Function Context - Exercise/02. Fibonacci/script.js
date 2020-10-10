function getFibonator(){

    let currentNumber = 0;
    let nextNumber = 1;

    return () => {
        let result = currentNumber + nextNumber;
        currentNumber = nextNumber;
        nextNumber = result;

        return currentNumber;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13