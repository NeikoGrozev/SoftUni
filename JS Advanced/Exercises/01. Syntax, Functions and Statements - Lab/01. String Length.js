function solve(arr1, arr2, arr3) {
    let sumLength;
    let averageLength;

    let firstLength = arr1.length;
    let secondLength = arr2.length;
    let thirdLength = arr3.length;

    sumLength = firstLength + secondLength + thirdLength;
    averageLength = Math.floor(sumLength / 3);

    console.log(sumLength);
    console.log(averageLength);
}

solve('chocolate', 'ice cream', 'cake')
solve('pasta', '5', '22.3')