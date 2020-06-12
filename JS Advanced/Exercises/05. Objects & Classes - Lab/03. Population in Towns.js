function solve(array) {

    let result = {};

    for (const arr of array) {

        let items = arr.split(' <-> ');
        let town = items[0];
        let population = Number(items[1]);

        if (!result.hasOwnProperty(town)) {
            result[town] = 0;
        }

        result[town] += population;
    }

    Object.entries(result).forEach(e => {
        console.log(`${e[0]} : ${e[1]}`)
    });
}

solve(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
);

solve(['Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000']
);