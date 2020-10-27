function solve(obj) {
    const engine = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];

    const carriage = {
        hatchback: { type: 'hatchback', color: obj.color },
        coupe: { type: 'coupe', color: obj.color }
    }

    function wheels() {

        let num = obj.wheelsize;

        if (num % 2 == 0) {
            num--;
        }

        let arr = Array(4).fill(num);

        return arr;
    }

    return {
        model: obj.model,
        engine: engine.find(e => e.power >= obj.power),
        carriage: carriage[obj.carriage],
        wheels: wheels()
    }
}

console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}
))