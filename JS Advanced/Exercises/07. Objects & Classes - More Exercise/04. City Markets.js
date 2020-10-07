function solve(input) {

    let result = new Map();

    for (const line of input) {
        let [town, product, amountAndPrice] = line.split(' -> ');
        let [amount, price] = amountAndPrice.split(' : ')
        let totalPrice = amount * price;

        if (!result.has(town)) {
            result.set(town, new Map());
        }

        result.get(town).set(product, totalPrice);
    }

    for (const currentTown of result) {
        console.log(`Town - ${currentTown[0]}`);

        for (const currentProduct of currentTown[1]) {
            console.log(`$$$${currentProduct[0]} : ${currentProduct[1]}`);
        }
    } 
}

solve(
    ['Sofia -> Laptops HP -> 200 : 2000',
        'Sofia -> Raspberry -> 200000 : 1500',
        'Sofia -> Audi Q7 -> 200 : 100000',
        'Montana -> Portokals -> 200000 : 1',
        'Montana -> Qgodas -> 20000 : 0.2',
        'Montana -> Chereshas -> 1000 : 0.3']
)