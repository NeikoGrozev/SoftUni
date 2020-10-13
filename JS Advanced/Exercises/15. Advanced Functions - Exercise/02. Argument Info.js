function solve(...input) {

    Object.entries(input.reduce((acc, curr) => {
        let typeOfArg = typeof curr;
        console.log(`${typeOfArg}: ${curr}`)

        if (!acc.hasOwnProperty(typeOfArg)) {
            acc[typeOfArg] = 0;
        }

        acc[typeOfArg]++;

        return acc;
    }, {}))
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => `${type} = ${count}`)
        .forEach((el) => console.log(el))
}

solve('cat', 'dog', 42, 50, 70, function () { console.log('Hello world!')})