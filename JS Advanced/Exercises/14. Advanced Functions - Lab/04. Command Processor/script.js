function solution() {
    let result = '';
    return {
        append: (s) => result += s,
        removeStart: (n) => result = result.substring(n),
        removeEnd: (n) => result = result.substring(0, result.length - n),
        print: () => console.log(result)
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);

// let secondZeroTest = solution();

// secondZeroTest.append('123');
// secondZeroTest.append('45');
// secondZeroTest.removeStart(2);
// secondZeroTest.removeEnd(1);
// secondZeroTest.print();
