class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.totalProfit = 0;
        this.soldTickets = 0;

    }

    newScreening(date, hall, description) {

        let isHaveScreen = this.screenings.find(x => x.date == date && x.hall == hall);

        if (!isHaveScreen) {
            this.screenings.push({
                date,
                hall,
                description,
            });

            return `New screening of ${this.movieName} is added.`;
        }

        throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
    }

    endScreening(date, hall, soldTickets) {

        let isHaveScreen = this.screenings.find(x => x.date == date && x.hall == hall);

        if (isHaveScreen) {
            let currentProfit = this.ticketPrice * Number(soldTickets);
            this.totalProfit += currentProfit;
            this.soldTickets += soldTickets;

            let index = this.screenings.findIndex(x => x.date == date && x.hall == hall);
            this.screenings.splice(index, 1);

            return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`
        }

        throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
    }

    toString() {
        let result = `${this.movieName} full information:`;
        result += '\n';
        result += `Total profit: ${this.totalProfit.toFixed()}$`;
        result += '\n';
        result += `Sold Tickets: ${this.soldTickets}`
        result += '\n';

        if (this.screenings.length > 0) {
            result += `Remaining film screenings:`

            let sortedMovie = Object.values(this.screenings).sort((a, b) => a.hall.localeCompare(b.hall));
            for (const item of sortedMovie) {
                result += '\n';
                result += `${item.hall} - ${item.date} - ${item.description}`
            }
        } else {
            result += `No more screenings!`
        }

        return result;
    }
}

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());

// New screening of Wonder Woman 1984 is added.
// New screening of Wonder Woman 1984 is added.
// New screening of Wonder Woman 1984 is added.
// Wonder Woman 1984 movie screening on October 2, 2020 in IMAX 3D hall has ended. Screening profit: 1500
// Wonder Woman 1984 movie screening on October 3, 2020 in Main hall has ended. Screening profit: 780
// Wonder Woman 1984 full information:
// Total profit: 2280$
// Sold Tickets: 228
// Remaining film screenings:
// IMAX 3D - October 4, 2020 - 3D
// Wonder Woman 1984 full information:
// Total profit: 2280$
// Sold Tickets: 228
// Remaining film screenings:
// 235 - October 4, 2020 - regular
// 235 - October 3, 2020 - regular
// IMAX 3D - October 4, 2020 - 3D
// Main - October 5, 2020 - regular
// Main - October 4, 2020 - regular
