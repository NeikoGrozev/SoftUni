function solve(input) {

    let result = {};

    for (const str of input) {
        let currentWords = str.split(/[^0-9a-zA-Z_]/).filter(x => x !== "");

        for (const word of currentWords) {

            if (!result.hasOwnProperty(word)) {
                result[word] = 1;
                continue;
            }

            result[word]++;
        }
    }

    result = JSON.stringify(result);

    console.log(result);
}

solve(
    ['JS devs use Node.js for server-side JS.-- JS for devs']
);