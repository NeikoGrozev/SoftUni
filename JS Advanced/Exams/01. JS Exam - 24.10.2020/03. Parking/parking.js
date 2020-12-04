class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {

        if (this.capacity > this.vehicles.length) {
            let vehicle = {
                carModel: carModel,
                carNumber: carNumber,
                payed: false
            }

            this.vehicles.push(vehicle);

            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }

        return 'Not enough parking space.';
    }

    removeCar(carNumber) {

        let index = this.vehicles.findIndex(x => x.carNumber == carNumber);

        if (!index) {
            return 'The car, you\'re looking for, is not found.';
        } else if (this.vehicles[index].payed == false) {
            return `${carNumber} needs to pay before leaving the parking lot.`;
        }

        this.vehicles.slice(index, 1);

        return `${carNumber} left the parking lot.`
    }
}




const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
// console.log(parking.getStatistics());

// console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));


// The Volvo t600, with a registration number TX3691CA, parked.
// The Parking Lot has 11 empty spots left.
// Volvo t600 == TX3691CA - Not payed
// TX3691CA's driver successfully payed for his stay.
// TX3691CA left the parking lot.
