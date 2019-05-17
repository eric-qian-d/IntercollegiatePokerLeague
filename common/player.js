function newPlayer(id, position, initStack) {
	var playerObject = {};
	playerObject.id = id;
	playerObject.position = position;
	player.hand = [];
	player.stackSize = initStack;
}


function updatePlayerHand(player, card1, card2) {
	player.hand.push(card1);
	player.hand.push(card2);
}

function updatePlayerStack(player, stackDelta) {
	player.stackSize += stackDelta;
}
