const Card = require('./card');

suitsMap = {};
suitsMap[0] = 'Hearts';
suitsMap[1] = 'Spades';
suitsMap[2] = 'Diamonds';
suitsMap[3] = 'Clubs';

module.exports = class Deck{
	/**
	 * Creates a new, shuffled deck
	 */
	constructor() {
		this.currentCardIndex = 0;
		this.cards = [];
		for(var i = 1; i < 14; i++) {
			for(var j = 0; j < 4; j++) {
				this.cards.push(new Card(suitsMap[j], i));
			}
		}
		this.shuffleDeck();
	}

	/**
	 * Shuffles the deck so that it's in a random order
	 */
	shuffleDeck() {
		// from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
		var currentIndex = this.cards.length;
		var temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

	/**
	 * Returns the next card object in the deck that hasn't been seen yet
	 * @return {Card} The next card
	 */
	getNextCard() {
		const nextCard = this.cards[this.currentCardIndex];
		this.currentCardIndex++;
		return nextCard;
	}
};
