  
function solve() {
    let num1, num2, result;
    return {
        init:  function(selector1,selector2,resultSelector){
            num1 = $(selector1);
            num2 = $(selector2);
            result = $(resultSelector);
        },
        add: function () {
            let firstVal = Number(num1.val());
            let secondVal = Number(num2.val());
            result.val(firstVal + secondVal);
        },
        subtract: function () {
            let firstVal = Number(num1.val());
            let secondVal = Number(num2.val());
            result.val(firstVal - secondVal);
        }
    }
}