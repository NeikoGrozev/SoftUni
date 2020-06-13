function solve(input) {
    let result = [];

    for (const iterator of input) {
        let [name, level, items] = iterator.split(' / ');

        level = Number(level);
        items = items ? items.split(', ') : [];

        let obj = {
            name: name,
            level: level,
            items: items,
        }
        
        result.push(obj);
    }

    return JSON.stringify(result);
}

console.log(solve(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
));

console.log(solve(['Jake / 1000 / Gauss, HolidayGrenade']));