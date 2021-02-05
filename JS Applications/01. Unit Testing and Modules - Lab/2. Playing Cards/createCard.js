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

console.log(createCard('A', 'S').toString());
console.log(createCard('10', 'H').toString());
console.log(createCard('1', 'C').toString());