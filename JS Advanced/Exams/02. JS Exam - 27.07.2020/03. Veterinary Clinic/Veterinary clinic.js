class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = 0;
    }

    newCustomer(ownerName, petName, kind, procedures) {

        if (this.currentWorkload >= this.capacity) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        let currentOwnerObj = this.clients.find(x => x.name == ownerName);

        if (!currentOwnerObj) {
            let currentOwner = {
                name: ownerName,
                pets: [],
            }

            this.clients.push(currentOwner);
        }
        currentOwnerObj = this.clients.find(x => x.name == ownerName);
        let pet = currentOwnerObj.pets.find(x => x.name == petName);

        if (!pet) {
            let currentPet = {
                name: petName,
                kind: kind.toLowerCase(),
                procedures: procedures
            }

            currentOwnerObj.pets.push(currentPet);

        } else if (pet.procedures.length > 0) {
            throw new Error(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${pet.procedures.join(', ')}.`)
        } else {
            pet.procedures.push(procedures);
        }

        this.currentWorkload++;

        return `Welcome ${petName}!`

    }

    onLeaving(ownerName, petName) {
        let currentOwnerObj = this.clients.find(x => x.name == ownerName);

        if (!currentOwnerObj) {
            throw new Error('Sorry, there is no such client!');
        }

        let pet = currentOwnerObj.pets.find(x => x.name == petName);

        if (!pet || pet.procedures.length == 0) {
            throw new Error(`Sorry, there are no procedures for ${petName}!`);
        }

        this.totalProfit += pet.procedures.length * 500;
        pet.procedures = [];
        this.currentWorkload--;

        return `Goodbye ${petName}. Stay safe!`
    }

    toString() {

        let percentage = Math.floor((this.currentWorkload / this.capacity) * 100);

        let result = `${this.clinicName} is ${percentage}% busy today!`
        result += '\n';
        result += `Total profit: ${this.totalProfit.toFixed(2)}$`

        this.clients.sort((a, b) => a.name.localeCompare(b.name));

        for (const owner of this.clients) {

            result += '\n';
            result += `${owner.name} with:`

            owner.pets.sort((a, b) => a.name.localeCompare(b.name))

            for (const pet of owner.pets) {
                result += '\n';
                result += `---${ pet.name } - a ${ pet.kind } that needs: ${pet.procedures.join(', ')}`
            }
        }

        return result;
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.toString());
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']);
console.log(clinic.toString());