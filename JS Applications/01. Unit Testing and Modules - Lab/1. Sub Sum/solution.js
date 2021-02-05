function solution(array, startIndex, endIndex) {
    if (!Array.isArray(array)) {
        return NaN;
    }

    if (array.length == 0) {
        return 0;
    }

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex >= array.length) {
        endIndex = array.length - 1;
    }

    if (!array.every(Number)) {
        return NaN;
    }

    return array
        .slice(startIndex, endIndex + 1)
        .map(Number)
        .reduce((acc, curr) => acc += curr);
}

 console.log(solution([10, 20, 30, 40, 50, 60], 3, 300));
 console.log(solution([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
 console.log(solution([10, 'twenty', 30, 40], 0, 2));
 console.log(solution([], 1, 2));
 console.log(solution('text', 0, 2));