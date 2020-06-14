function solve(arr) {
    let num = arr[0];

    for (let i = 1; i < arr.length; i++) {

        if (arr[i] == 'chop') {
            num /= 2;
        } else if (arr[i] == 'dice') {
            num = Math.sqrt(num);
        }else if(arr[i] == 'spice') {
            num++;
        }else if(arr[i] == 'bake') {
            num *= 3;
        }else if(arr[i] == 'fillet') {
            num *= 0.8;
        }

        console.log(num);
    }
}

solve(['32', 'chop', 'chop', 'chop', 'chop', 'chop'])
solve(['9', 'dice', 'spice', 'chop', 'bake', 'fillet'])