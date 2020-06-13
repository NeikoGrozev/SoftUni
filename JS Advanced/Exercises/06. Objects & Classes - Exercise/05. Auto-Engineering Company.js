function solve(input) {

    let result = {};

    for (const iterator of input) {

        let [brand, model, numberOfCars] = iterator.split(' | ');
        numberOfCars = Number(numberOfCars);

        if (!result.hasOwnProperty(brand)) {
            result[brand] = {};
            result[brand][model] = numberOfCars;
        } else if (!result[brand].hasOwnProperty(model)) {
            result[brand][model] = numberOfCars;
        } else {
            result[brand][model] += numberOfCars;
        }
    }

    for (const currentBrand in result) {
        console.log(currentBrand)

        for (const [key, value] of Object.entries(result[currentBrand])) {
            console.log(`###${key} -> ${value}`)
        }
    }
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
)