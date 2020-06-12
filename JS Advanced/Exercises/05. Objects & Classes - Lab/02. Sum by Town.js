function solve(arr) {

    let towns = {};

    for (let i = 0; i < arr.length; i += 2) {

        let town = arr[i];

        if (!towns.hasOwnProperty(town)){
            towns[town] = 0;
        }

        towns[town] += Number(arr[i+1]);
    }
    
    return JSON.stringify(towns);
}

console.log(solve(['Sofia', '20', 'Varna', '3', 'Sofia', '5', 'Varna', '4']))
console.log(solve(['Sofia', '20', 'Varna', '3', 'sofia', '5', 'varna', '4']))