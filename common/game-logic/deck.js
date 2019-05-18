card = require('./card');

suitsMap = {};
suitsMap[0] = 'Heart';
suitsMap[1] = 'Spade';
suitsMap[2] = 'Diamond';
suitsMap[3] = 'Club';


var Deck = class {
	constructor() {
		this.cards = [];
		for(int i = 1; i < 14; i++) {
			for(int j = 0; j < 4; j++) {
				this.deck.cards(new Card(suitsMap[j], i));
			}
		}
	}

	/**
	 * Shuffles
	 * @param  {[Deck]} deck [description]
	 */
	function shuffleDeck(deck) {
		// from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
		var currentIndex = deck.cards.length;
		var temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = deck.cards[currentIndex];
			deck.cards[currentIndex] = deck[randomIndex];
			deck.cards[randomIndex] = temporaryValue;
		}
	}
};
