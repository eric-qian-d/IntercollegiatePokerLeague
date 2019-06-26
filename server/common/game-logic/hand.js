intToSuit = {};
intToSuit[0] = 'Hearts';
intToSuit[1] = 'Spades';
intToSuit[2] = 'Diamonds';
intToSuit[3] = 'Clubs';


/**
* Finds the ranking of the best 5-card hand out of 7 inputs
* @params cards is an array of 7 cards to be evaluated
*/
module.exports = {
	getRanking: (hand, board) => {
		const cards = [];
		for(var i = 0; i < 2; i++) {
			cards.push(hand[i]);
		}
		for(var i = 0; i < 5; i++) {
			cards.push(board[i]);
		}
		const sortedCards = cards.sort((card1, card2) => {return card2.power - card1.power});
		const suitMap = {};
		//TODO: create a standardized dictionary for suit names and split this across modules
		suitMap['Hearts'] = 0;
		suitMap['Spades'] = 0;
		suitMap['Clubs'] = 0;
		suitMap['Diamonds'] = 0;
		rankMap = {};
		for(var i = 1; i < 15; i++) {
			rankMap[i] = 0;
		}
		for(var i = 0; i < 7; i++) {
			//counts the number of each suit
			suitMap[sortedCards[i].suit]++;
			//counts the number of each rank
			rankMap[sortedCards[i].power]++;
			//for counting A-5 straights
			if (sortedCards[i].power == 14) {
				rankMap[1]++;
			}
		}
		var pair1 = 0;
		var pair2 = 0;
		var pair3 = 0;
		var triple1 = 0;
		var triple2 = 0;
		var quad1 = 0;
		var single1 = 0;
		var single2 = 0;
		var single3 = 0;
		var single4 = 0;
		var single5 = 0;
		var straightCtr = 0;
		var straight = false;
		var straightHigh = 0;
		var flush = false;
		var flushSuit = null;
		var flush1 = -10;
		var flush2 = -10;
		var flush3 = -10;
		var flush4 = -10;
		var flush5 = -10;
		var flush6 = -10;
		var flush7 = -10;
		var straightFlush = false;
		var straightFlushHigh = 0;

		for(var i = 14; i > 1; i--) {
			if (rankMap[i] == 1) {
				//finds the 3 highest unpaired values
				if (single1 == 0) {
					single1 = i;
				} else if (single2 == 0) {
					single2 = i;
				} else if (single3 == 0){
					single3 = i;
				} else if (single4 == 0) {
					single4 = i;
				} else if (single5 == 0) {
					single5 = i;
				}
			} else if (rankMap[i] == 2) {
				//finds the 2 highest paired values: note that a triple of kings may be broken down into a pair
				if (pair1 == 0) {
					pair1 = i;
				} else if (pair2 == 0) {
					pair2 = i;
				} else if (pair3 == 0) {
					pair3 = i;
				}
			} else if (rankMap[i] == 3) {
				//finds the highst triple
				if (triple1 == 0) {
					triple1 = i;
				} else if (triple2 == 0) {
					triple2 = i;
				}
			} else if (rankMap[i] == 4) {
				//finds the highest quad
				quad1 = i;
			}
		}
		console.log(rankMap);
		for(var i = 1; i < 15; i++) {
			if (rankMap[i] > 0) {
				//finds straights
				straightCtr++;
				if (straightCtr >= 5) {
					straight = true;
					straightHigh = i;
				}
			} else {
				straightCtr = 0;
			}
		}
		Object.keys(suitMap).forEach(suit => {
			if (suitMap[suit] >= 5) {
				flush = true;
				flushSuit = suit;
			}
		})
		if (flush) {
			for (var i = 0; i < 7; i++) {
				const currentCard = sortedCards[i]
				if (currentCard.suit == flushSuit) {
					const currentCardValue = currentCard.power;
					//finds the strength of the flush
					if (flush1 == -10) {
						flush1 = currentCardValue;
					} else if (flush2 == -10) {
						flush2 = currentCardValue;
					} else if (flush3 == -10) {
						flush3 = currentCardValue;
					} else if (flush4 == -10) {
						flush4 = currentCardValue;
					} else if (flush5 == -10) {
						flush5 = currentCardValue;
					} else if (flush6 == -10) {
						flush6 = currentCardValue;
					} else if (flush7 == -10) {
						flush7 = currentCardValue;
					}
				}
			}
			console.log(flush1);
			console.log(flush2);
			console.log(flush3);
			console.log(flush4);
			console.log(flush5);
			console.log(flush6);
			console.log(flush7);

			if(flush1 - flush5 === 4) {
				straightFlush = true;
				straightFlushHigh = flush1;
			} else if (flush2 - flush6 === 4) {
				straightFlush = true;
				straightFlushHigh = flush2;
			} else if (flush3 - flush7 === 4) {
				straightFlush = true;
				straightFlushHigh = flush3;
			} else if (flush1 === 14) {//straight flush A-5 check
				if ((flush2 - flush5 == 3 && flush2 == 5) || (flush3 - flush6 == 3 && flush2 == 5) || (flush4 - flush7 == 3 && flush2 == 5))
				straightFlush = true;
				straightFlushHigh = 5;
			}
		}
		if (straightFlush) {
			console.log('straight flush');
			return straightFlushHigh * 10000000000000000
		} else if (quad1 > 0) {
			console.log('quads');
			const singleVal = Math.max(single1, pair1, triple1);
			return quad1 * 100000000000000 + singleVal;
		} else if (triple1 > 0 && (triple2 > 0 || pair1 > 0)) {
			console.log('house');
			const pairVal = triple2 > pair1 ? triple2 : pair1;
			return triple1 * 1000000000000 + pairVal;
		} else if (flush) {
			console.log('flush');
			return flush1 * 10000000000 + 100000000 * flush2 + 1000000 * flush3 + 10000 * flush4 + 100 * flush5;
		} else if (straight) {
			console.log('straight');
			return straightHigh * 100000000;
		} else if (triple1 > 0) {
			console.log('set');
			return triple1 * 1000000 + single1 + single2;
		} else if (pair1 > 0 && pair2 > 0) {
			console.log('two pair');
			const singleVal = pair3 > single1 ? pair3 : single1;
			return pair1 * 10000 + pair2 * 100 + singleVal;
		} else if (pair1 > 0) {
			return pair1 * 100 + single1 + single2 + single3;
		} else {
			return single1 + single2 + single3 + single4 + single5;
		}
	}
}
