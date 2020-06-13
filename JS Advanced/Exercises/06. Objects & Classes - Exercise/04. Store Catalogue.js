function solve(input) {
    let catalogue = [];

    for (const iterator of input) {

        let products = iterator.split(' : ');

        let name = products[0];
        let firstLetter = name[0];
        let price = Number(products[1]);

        let obj = {
            firstLetter: firstLetter,
            name: name,
            price: price
        }
        catalogue.push(obj);
    }

    let sortedCatalogue = catalogue.sort((a, b) => a.firstLetter.localeCompare(b.firstLetter))
        .sort((a, b) => a.name.localeCompare(b.name));

    let letter = '';

    sortedCatalogue.forEach(el => {
        if (el.firstLetter !== letter) {
            console.log(el.firstLetter);
            letter = el.firstLetter;
        }

        console.log(`  ${el.name}: ${el.price}`)
    });
}


solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
)

solve(['Banana : 2',
`Rubic 's Cube : 5`,
'Raspberry P : 4999',
'Rolex : 100000',
'Rollon : 10',
'Rali Car : 2000000',
'Pesho : 0.000001',
'Barrel : 10']
)