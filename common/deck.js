card = require('./card.js');

suitsMap = {};
suitsMap[0] = 'Heart';
suitsMap[1] = 'Spade';
suitsMap[2] = 'Diamond';
suitsMap[3] = 'Club';


function newDeck() {
	deck = [];
	for(int i = 1; i < 14; i++) {
		for(int j = 0; j < 4; j++) {
			deck.push(card.newCard(suitsMap[j], i));
		}
	}
	return deck;
}

function shuffleDeck(deck) {
	// from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
	var currentIndex = deck.length;
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = deck[currentIndex];
		deck[currentIndex] = deck[randomIndex];
		deck[randomIndex] = temporaryValue;
	}
	return deck;
}