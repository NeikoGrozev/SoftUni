function printDeckOfCards(cards) {
    function createCard(face, suit) {
        const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const validSuits = ['S', 'H', 'D', 'C'];

        if (!validFaces.includes(face)) {
            throw Error(`Invalid card face: ${face}`);
        }

        if (!validSuits.includes(suit)) {
            throw Error(`invalid card suit: ${suit}`);
        }

        let suitToChar = {
            'S': "\u2660", // ♠
            'H': "\u2665", // ♥
            'D': "\u2666", // ♦
            'C': "\u2663", // ♣
        };

        let card = {
            toString: () => `${face}${suitToChar[suit]}`
        }

        return card;
    }

    let desk = [];
    let isTrue = true;

    cards.forEach(x => {
        let currentFace = x.substring(0, x.length - 1);
        let currentSuit = x.substring(x.length - 1);

        try {
            desk.push(createCard(currentFace, currentSuit));
        } catch {
            console.log(`Invalid card: ${x}`)
            isTrue = false;

            return;
        }
    });

    if (isTrue) {
        console.log(desk.join(' '));
    }
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);