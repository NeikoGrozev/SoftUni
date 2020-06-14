function solve(input) {
    const firstPoint = [Number(input[0]), Number(input[1])];
    const secondPoint = [Number(input[2]), Number(input[3])];

    function distance(x1, y1, x2, y2) {

        const firstDistance = x1 - x2;
        const secondDistance = y1 - y2;

        const result = Math.sqrt(Math.pow(firstDistance, 2) + Math.pow(secondDistance, 2));
        return result;
    }

    function printResult(n, param1, param2) {
        param1 = param1.join(', ');
        param2 = param2.join(', ');

        if (n === parseInt(n)) {
            console.log(`{${param1}} to {${param2}} is valid`);
        } else {
            console.log(`{${param1}} to {${param2}} is invalid`);
        }
    }

    const a = Number(distance(...firstPoint, 0, 0));
    const b = Number(distance(...secondPoint, 0, 0));
    const c = Number(distance(...firstPoint, ...secondPoint));

    printResult(a, firstPoint, [0, 0]);
    printResult(b, secondPoint, [0, 0]);
    printResult(c, firstPoint, secondPoint);
}

solve([3, 0, 0, 4])
solve([2, 1, 1, 1])