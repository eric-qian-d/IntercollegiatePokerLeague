module.exports = class Card {
	constructor(suit, rank) {
		this.suit = suit;
		this.rank = rank;
		this.power = (rank == 1) ? 14: rank;
	}
}
