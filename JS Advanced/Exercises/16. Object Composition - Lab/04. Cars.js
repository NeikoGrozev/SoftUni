function solve(input) {
    let cars = {};

    let commands = {
        create: function ([name, inherits, parentName]) {
            if (inherits) {
                cars[name] = Object.create(cars[parentName]);
            } else {
                cars[name] = {};
            }
        },
        set: function ([name, key, value]) {
            cars[name][key] = value;
        },
        print: function (name) {
            let car = cars[name];
            let properties = []

            for (const prop in car) {
                properties.push(`${prop}:${car[prop]}`)
            }

            console.log(properties.join(', '))
        }
    }

    for (const arr of input) {
        let items = arr.split(' ');
        let command = items.shift();
        commands[command](items);
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)