function solve(arr) {

    let regex = /\s*\|\s*/;
    let result = [];

    for (const currentTown of arr.slice(1)) {

        let [empty, town, lan, lon] = currentTown.split(regex);

        let obj = {
            Town: town,
            Latitude: Number(Number(lan).toFixed(2)),
            Longitude: Number(Number(lon).toFixed(2)),
        }

        result.push(obj);
    }

    return JSON.stringify(result);
}

console.log(solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
))

console.log(solve(['| Town | Latitude | Longitude |',
'| Veliko Turnovo | 43.0757 | 25.6172 |',
'| Monatevideo | 34.50 | 56.11 |']
))