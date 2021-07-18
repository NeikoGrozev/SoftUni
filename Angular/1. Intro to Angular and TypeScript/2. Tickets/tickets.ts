class Ticket {
    constructor(public destination: string, public price: number, public status: string) {

    }
}

function sortTickets(tickets: string[], sortingCriteria: string): Ticket[] {
    let ticketsObj: Ticket[] = tickets.map(t => {
        let currentTicketData = t.split('|');
        let currentTicket = new Ticket(currentTicketData[0], Number(currentTicketData[1]), currentTicketData[2]);
        return currentTicket;
    });

    ticketsObj = ticketsObj.sort((a, b) => {
        if (a[sortingCriteria] > b[sortingCriteria]) {
            return 1;
        } else if (a[sortingCriteria] < b[sortingCriteria]) {
            return -1;
        } else {
            return 0;
        }
    });

    return ticketsObj;
}

let tickets = sortTickets(['Philadelphia|94.20|available', 'New York City|95.99|available', 'New York City|95.99|sold', 'Boston|126.20| departed'], 'destination')

console.log(tickets);

tickets = sortTickets(['Philadelphia|94.20|available', 'New York City|95.99|available', 'New York City|95.99|sold', 'Boston|126.20|departed'], 'status')

console.log(tickets);


