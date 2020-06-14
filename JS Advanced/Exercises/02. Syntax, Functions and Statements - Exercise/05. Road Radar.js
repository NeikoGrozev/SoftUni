function solve(arr) {

    const [speed, area] = arr;
    const speedLimit = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20,
    };

    function checkingSpeed(value) {

        if (value - speedLimit[area] <= 0) {
            return '';
        } else if (value - speedLimit[area] <= 20) {
            return 'speeding';
        } else if (value - speedLimit[area] <= 40) {
            return 'excessive speeding';
        } else {
            return 'reckless driving';
        }
    }

    console.log(checkingSpeed(speed));
}

solve([40, 'city'])
solve([21, 'residential'])
solve([120, 'interstate'])
solve([200, 'motorway'])