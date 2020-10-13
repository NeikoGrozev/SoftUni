function solve() {

    let microelements = {
      protein: 0,
      carbohydrate: 0,
      fat: 0,
      flavour: 0
  }

  let recipesList = {
      apple: {
          carbohydrate: 1,
          flavour: 2
      },
      lemonade: {
          carbohydrate: 10,
          flavour: 20
      },
      burger: {
          carbohydrate: 5,
          fat: 7,
          flavour: 3
      },
      eggs: {
          protein: 5,
          fat: 1,
          flavour: 1
      },
      turkey: {
          protein: 10,
          carbohydrate: 10,
          fat: 10,
          flavour: 10
      }
  }   

  let restock = function (microelementName, quantity) {
      microelements[microelementName] += Number(quantity);

      return 'Success';
  }

  let prepare = function (recipe, quantity) {
      quantity = Number(quantity);

      for (const item of Object.entries(recipesList[recipe])) {
          if (microelements[item[0]] <= item[1] * quantity) {

              return `Error: not enough ${item[0]} in stock`
          }
      }

      for (const item of Object.entries(recipesList[recipe])) {

          microelements[item[0]] -= item[1] * quantity;
      }
      
      return 'Success';
  }

  let report = function (microelements) {

      return `protein=${microelements.protein} carbohydrate=${microelements.carbohydrate} fat=${microelements.fat} flavour=${microelements.flavour}`
  }

  let actionList = {
      restock,
      prepare,
      report
  }

  return function (input) {
      let [command, ...others] = input.split(' ');

      if (command == 'report') {
          return actionList[command](microelements);
      }

      return actionList[command](...others);
  }
}

let manager = solve()
console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));

// let manager = solve()
// console.log(manager('restock protein 100'));
// console.log(manager('restock carbohydrate 100'));
// console.log(manager('restock fat 100'));
// console.log(manager('restock flavour 100'));
// console.log(manager('report'));
// console.log(manager('prepare eggs 2'));
// console.log(manager('report'));
// console.log(manager('prepare eggs 1'));
// console.log(manager('report'));
