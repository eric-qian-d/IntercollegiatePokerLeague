intToSuit = {};
intToSuit[0] = 'Heart';
intToSuit[1] = 'Spade';
intToSuit[2] = 'Diamond';
intToSuit[3] = 'Club';


/**
* Finds the ranking of the best 5-card hand out of 7 inputs
* @params cards is an array of 7 cards to be evaluated
*/
function getRanking(cards) {
	const sortedCards = cards.sort((card1, card2) => {return card2.power - card1.power});
	const suitMap = {};
	//TODO: create a standardized dictionary for suit names and split this across modules
	suitMap['Heart'] = 0;
	suitMap['Spade'] = 0;
	suitMap['Club'] = 0;
	suitMap['Heart'] = 0;
	rankMap = {};
	for(var i = 1; i < 15; i++) {
		rankMap[i] = 0;
	}
	for(var i = 0; i < 7; i++) {
		suitMap[sortedCards[i].suit]++;
		rankMap[sortedCards[i].power]++;
		if (sortedCards[i].power == 14) {
			rankMap[1]++;
		}
	}
	var pair1 = 0;
	var pair2 = 0;
	var triple1 = 0;
	var single1 = 0;
	var single2 = 0;
	var single3 = 0;
	var straightCtr = 0;
	var straight = false;
	var straightHigh = 0;
	var flush = false;
	var flushSuit = null;
	var flush1 = 0;
	var flush2 = 0;
	var flush3 = 0;
	var flush4 = 0;
	var flush5 = 0;
	var flush6 = 0;
	var flush7 = 0;
	var straightFlush = false;
	straightFlushHigh = 0;
	for(var i = 14; i > 1; i--) {
		if (rankMap[i] == 1) {
			if (single1 != 0) {
				single1 = i;
			} else if (single2 != 0) {
				single2 = i;
			} else if (single3 != 0){
				single3 = i;
			}
		} else if (rankMap[i] == 2) {
			if (pair1 != 0) {
				pair1 = i;
			} else if (pair2 != 0) {
				pair2 = i;
			};
		} else if (rankMap[i] == 3) {
			if (triple1 != 0) {
				triple1 = i;
			}
		}
	}
	for(var i = 1; i < 15; i++) {
		if (rankMap[i] > 0) {
			straightCtr++;
			if (straightCtr > 5) {
				straight = true;
				straightHigh = i;
			}
		} else {
			straightCtr = 0;
		}
	}
	for(var i = 0; i < 4; i++) {
		if (intToSuit[i] >= 5) {
			flush = true;
			flushSuit = intToSuit[i];
		}
	}
	if (flush) {
		for (var i = 6; i >= 0; i--) {
			const currentCard = sortedCards[i]
			if (currentCard.suit == flushSuit) {
				const currentCardValue = currentCard.power;
				if (flush1 != 0) {
					flush1 = currentCardValue;
				} else if (flush2 != 0) {
					flush2 = currentCardValue;
				} else if (flush3 != 0) {
					flush3 = currentCardValue;
				} else if (flush4 != 0) {
					flush4 = currentCardValue;
				} else if (flush5 != 0) {
					flush5 = currentCardValue;
				} else if (flush6 != 0) {
					flush6 = currentCardValue;
				} else if (flush7 != 0) {
					flush7 = currentCardValue;
				}
			}
		}

		if(flush1 - flush5 == 4) {
			straightFlush = true;
			straightFlushHigh = flush1;
		} else if (flush2 - flush6 == 4) {
			straightFlush = true;
			straightFlushHigh = flush2;
		} else if (flush3 - flush7 == 4) {
			straightFlush = true;
			straightFlushHigh = flush3;
		} else if (flush4 - flush7 == 3 && flush7 == 2 && flush1 == 14) {//straight flush A-5
			straightFlush = true;
			straightFlushHigh = 5;
		}
	}


}
