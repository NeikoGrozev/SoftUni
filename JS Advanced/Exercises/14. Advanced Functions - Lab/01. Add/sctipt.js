function solution(a){
    let num = a;

    return (b) => a + b;
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));
