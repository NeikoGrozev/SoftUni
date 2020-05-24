function solve(arr){
    let sum = 0;
    let specialSum = 0;
    let concat = '';

    for(let i = 0; i < arr.length; i++){

        sum += arr[i];
        specialSum += 1/arr[i];
        concat += arr[i].toString();
    }

    console.log(sum);
    console.log(specialSum)
    console.log(concat);
}

solve([1, 2, 3])
solve([2, 4, 8, 16])