function solve(input) {

    input = JSON.parse(input);
    let output = {};

    for (const kvp of input) {
        for (const [key, value] of Object.entries(kvp)) {
            output[key] = value;
        }
    }
    
    return output;
}

console.log(solve(`[{ "canMove": true }, { "canMove": true, "doors": 4 }, { "capacity": 5 }]`))