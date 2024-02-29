class Card {
    constructor(suit, rank, value, rankValue) {
        this.Suit = suit;
        this.Rank = rank;
        this.Value = value;
        this.RankValue = rankValue;
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.createDeck();
    }

    createDeck() {
        const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];

        const ranks = [
            { rank: 'Two', value: 2, rankValue: 2 },
            { rank: 'Three', value: 3, rankValue: 3 },
            { rank: 'Four', value: 4, rankValue: 4 },
            { rank: 'Five', value: 5, rankValue: 5 },
            { rank: 'Six', value: 6, rankValue: 6 },
            { rank: 'Seven', value: 7, rankValue: 7 },
            { rank: 'Eight', value: 8, rankValue: 8 },
            { rank: 'Nine', value: 9, rankValue: 9 },
            { rank: 'Ten', value: 10, rankValue: 10 },
            { rank: 'Jack', value: 10, rankValue: 11 },
            { rank: 'Queen', value: 10, rankValue: 12 },
            { rank: 'King', value: 10, rankValue: 13 },
            { rank: 'Ace', value: 11, rankValue: 14 }
        ];

        suits.forEach(suit => {
            ranks.forEach(({ rank, value, rankValue }) => {
                this.deck.push(new Card(suit, rank, value, rankValue));
            });
        });
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealCards(number) {
        return this.deck.splice(0, number);
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.Hand = [];
    }

    receiveCards(cards) {
        this.Hand.push(...cards);
    }

    discardCards(number) {
        return this.Hand.splice(0, number);
    }

    calculateTotalValue() {
        return this.Hand.reduce((sum, card) => sum + card.Value, 0);
    }
}
//  DEL 1
let deck = new Deck();

deck.shuffleDeck();

console.log("Shuffled deck:", deck.deck);


// DEL 2
let player1 = new Player("Slim");
let player2 = new Player("Luke");

player1.receiveCards(deck.dealCards(5));
player2.receiveCards(deck.dealCards(5));

console.log("Deck after dealing:", deck.deck.length, "cards");
console.log("Player 1 (Slim):", player1);
console.log("Player 2 (Luke):", player2);
console.log("Slim's hand value:", player1.calculateTotalValue());
console.log("Luke's hand value:", player2.calculateTotalValue());


// DEL 3 --- Note to self, when logging arrays only the current version of the array is shown so it may look like no cards been manipulated
let discardPile = [];
discardPile.push(...player1.discardCards(2));
discardPile.push(...player2.discardCards(2));

player1.receiveCards(deck.dealCards(2));
player2.receiveCards(deck.dealCards(2));

console.log("Deck after discards and new deals:", deck.deck.length, "cards");
console.log("Player 1 (Slim):", player1);
console.log("Player 2 (Luke):", player2);
console.log("Slim's hand value after new cards:", player1.calculateTotalValue());
console.log("Luke's hand value after new cards:", player2.calculateTotalValue());
// console.log(discardPile);

// DEL 4
deck.deck.push(...player1.Hand);
deck.deck.push(...player2.Hand);
player1.Hand = [];
player2.Hand = [];
deck.deck.push(...discardPile);
discardPile = [];

console.log("Resetting the deck and players.");

deck.shuffleDeck();
console.log("Shuffled deck after reset:", deck.deck);
/*
console.log(player1);
console.log(player2);
console.log(discardPile);
*/