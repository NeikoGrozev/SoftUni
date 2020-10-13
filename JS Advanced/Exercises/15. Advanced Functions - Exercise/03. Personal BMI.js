function solve(...input) {

    function calculateBMI(weight, height) {

        height /= 100;
        return Number((weight / (height ** 2)).toFixed())
    };

    function createStatus(num) {
        let status;
        if (num < 18.5) {
            status = 'underweight';
        } else if (num < 25) {
            status = 'normal';
        } else if (num < 30) {
            status = 'overweight';
        } else {
            status = 'obese';
        }

        return status;
    }

    function createPerson(input) {

        let [name, age, weight, height] = input;
        let person = {
            name: name,
            personalInfo: {
                age: age,
                weight: weight,
                height: height
            },
            BMI: calculateBMI(weight, height),
            status: createStatus(calculateBMI(weight, height))
        }

        if(person.status == 'obese'){
            person.recommendation = 'admission required';
        }

        return person;
    }

    return createPerson(input);
}


//console.log(solve('Peter', 29, 75, 182))
console.log(solve('Honey Boo Boo', 9, 57, 137))