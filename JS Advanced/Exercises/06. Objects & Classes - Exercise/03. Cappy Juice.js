function solve(input) {

    let bottle = {};
    let juice = {};

    for (const iterator of input) {

        let [juiceName, quantity] = iterator.split(' => ');
        quantity = Number(quantity);

        if (!juice.hasOwnProperty(juiceName)) {
            juice[juiceName] = quantity;
        } else {
            juice[juiceName] += quantity;
        }

        let currentQuantity = juice[juiceName];

        if (currentQuantity >= 1000) {

            let currentBottle = Math.floor(currentQuantity / 1000);

            if (!bottle.hasOwnProperty(juiceName)) {

                bottle[juiceName] = currentBottle;
            }else{

                bottle[juiceName] += currentBottle;
            }

            juice[juiceName] -= currentBottle * 1000;
        }
    }

    for (const key in bottle) {

        console.log(`${key} => ${bottle[key]}`);
    }
}

solve(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
)

solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
)