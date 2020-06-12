function solve(input) {

    let products = {};

    for (const item of input) {

        let [town, product, price] = item.split(' | ');
        price = Number(price);

        if (!products.hasOwnProperty(product)) {
            products[product] = { [town]: price };

        }else{
            products[product][town] = price;
        } 
    }

    for (const [key, value] of Object.entries(products)) {

        let items = Object.entries(value).sort((a, b) => a[1] - b[1])[0];
        console.log(`${key} -> ${items[1]} (${items[0]})`)
    }
}

solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']);

solve(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'])

solve(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'])