var Player = class {
	constructor(playerId, position, initStack) {
		this.id = playerId;
		this.position = position;
		this.hand = [];
		this.stackSize = initStack;
		this.inHand = false;
	}

	/**
	 * Updates the player's hand so that the player holds card1 and card2
	 * @param  {Card} card1 the first card that the player holds
	 * @param  {Card} card2 the second card that the player holds
	 */
	function updateHand(card1, card2) {
		this.hand[0] = card1;
		this.hand[1] = card2;
	}

	/**
	 * Updates the player's stack
	 * @param  {Integer} stackDelta the amount that the player's stack size changes by
	 */
	function updateStack(stackDelta) {
		this.stackSize += stackDelta;
	}
}
