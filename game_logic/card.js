function newCard(suit, rank) {
	var cardObject = {};
	cardObject.suit = suit;
	cardObject.rank = rank;
	cardObject.power = (rank == 1) ? 14 : rank;
}