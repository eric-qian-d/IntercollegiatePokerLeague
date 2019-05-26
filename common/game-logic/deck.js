card = require('./card');

suitsMap = {};
suitsMap[0] = 'Heart';
suitsMap[1] = 'Spade';
suitsMap[2] = 'Diamond';
suitsMap[3] = 'Club';

class Deck{
	/**
	 * Creates a new, ordered deck
	 */
	constructor() {
		this.currentCardIndex = 0;
		this.cards = [];
		for(var i = 1; i < 14; i++) {
			for(var j = 0; j < 4; j++) {
				this.deck.cards(new Card(suitsMap[j], i));
			}
		}
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
			this.cards[currentIndex] = deck[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	}

	/**
	 * Returns the next card object in the deck that hasn't been seen yet
	 * @return {Card} The next card
	 */
	getNextCard() {

	}
};
