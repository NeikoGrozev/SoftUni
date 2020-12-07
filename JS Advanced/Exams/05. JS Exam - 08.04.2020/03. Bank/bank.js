class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        let { firstName, lastName, personalId } = customer;

        let currentCustomer = this.allCustomers.find(x => x.firstName == firstName && x.lastName == lastName);

        if (currentCustomer) {
            throw new Error(`${firstName} ${lastName} is already our customer!`);
        }

        this.allCustomers.push({
            firstName,
            lastName,
            personalId,
            totalMoney: 0,
            transactions: []
        });

        return customer;
    }

    depositMoney(personalId, amount) {
        let currentCustomer = this.findCustomer(personalId);

        currentCustomer.totalMoney += Number(amount);
        currentCustomer.transactions.push(`${currentCustomer.transactions.length + 1}. ${currentCustomer.firstName} ${currentCustomer.lastName} made deposit of ${amount}$!`);

        return `${currentCustomer.totalMoney}$`;
    }


    withdrawMoney(personalId, amount) {
        let currentCustomer = this.findCustomer(personalId);
        
        if (currentCustomer.totalMoney < Number(amount)) {
            throw new Error(`${currentCustomer.firstName} ${currentCustomer.lastName} does not have enough money to withdraw that amount!`)
        }

        currentCustomer.totalMoney -= Number(amount);
        currentCustomer.transactions.push(`${currentCustomer.transactions.length + 1}. ${currentCustomer.firstName} ${currentCustomer.lastName} withdrew ${amount}$!`);

        return `${currentCustomer.totalMoney}$`
    }

    customerInfo(personalId) {
        let currentCustomer = this.findCustomer(personalId);

        let result = `Bank name: ${this._bankName}`
        result += '\n';
        result += `Customer name: ${currentCustomer.firstName} ${currentCustomer.lastName}`
        result += '\n';
        result += `Customer ID: ${currentCustomer.personalId}`;
        result += '\n';
        result += `Total Money: ${currentCustomer.totalMoney}$`;
        result += '\n';
        result += `Transactions:`;

        for (const item of currentCustomer.transactions.reverse()) {
            result += '\n';
            result += `${item}`;
        }

        return result;
    }

    findCustomer(id){
        let result = this.allCustomers.find(x => x.personalId == id);

        if (!result) {
            throw new Error('We have no customer with this ID!');
        }

        return result;
    }
}

let bank = new Bank("SoftUni Bank");

console.log(bank.newCustomer({firstName: "Svetlin", lastName: "Nakov", personalId: 6233267}));
console.log(bank.newCustomer({firstName: "Mihaela", lastName: "Mileva", personalId: 4151596}));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596,555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
