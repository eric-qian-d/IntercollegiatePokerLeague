const handLogic = require('../common/game-logic/hand');
const Card = require('../common/game-logic/card');

// //standard flush
// sampleBoard = [];
// sampleBoard.push(new Card('Spades', 2));
// sampleBoard.push(new Card('Spades', 3));
// sampleBoard.push(new Card('Spades', 14));
// sampleBoard.push(new Card('Hearts', 4));
// sampleBoard.push(new Card('Hearts', 5));
//
// sampleHand = [];
// sampleHand.push(new Card('Spades', 8));
// sampleHand.push(new Card('Spades', 7));
//
// sampleHand1 = [];
// sampleHand1.push(new Card('Spades', 9));
// sampleHand1.push(new Card('Spades', 4));
//
// console.log(handLogic.getRanking(sampleHand, sampleBoard));
// console.log(handLogic.getRanking(sampleHand1, sampleBoard));


// //straight flush
// sampleBoard = [];
// sampleBoard.push(new Card('Spades', 2));
// sampleBoard.push(new Card('Spades', 3));
// sampleBoard.push(new Card('Spades', 14));
// sampleBoard.push(new Card('Spades', 4));
// sampleBoard.push(new Card('Hearts', 5));
//
// sampleHand = [];
// sampleHand.push(new Card('Spades', 6));
// sampleHand.push(new Card('Spades', 5));
//
// sampleHand1 = [];
// sampleHand1.push(new Card('Spades', 9));
// sampleHand1.push(new Card('Spades', 13));
//
// console.log(handLogic.getRanking(sampleHand, sampleBoard));
// console.log(handLogic.getRanking(sampleHand1, sampleBoard));

// //quads
// sampleBoard = [];
// sampleBoard.push(new Card('Spades', 2));
// sampleBoard.push(new Card('Hearts', 2));
// sampleBoard.push(new Card('Clubs', 2));
// sampleBoard.push(new Card('Spades', 4));
// sampleBoard.push(new Card('Spades', 3));
//
// sampleHand = [];
// sampleHand.push(new Card('Spades', 6));
// sampleHand.push(new Card('Spades', 5));
//
// sampleHand1 = [];
// sampleHand1.push(new Card('Diamonds', 2));
// sampleHand1.push(new Card('Spades', 13));
//
// console.log(handLogic.getRanking(sampleHand, sampleBoard));
// console.log(handLogic.getRanking(sampleHand1, sampleBoard));
//


// //house
// sampleBoard = [];
// sampleBoard.push(new Card('Spades', 2));
// sampleBoard.push(new Card('Hearts', 2));
// sampleBoard.push(new Card('Clubs', 2));
// sampleBoard.push(new Card('Spades', 4));
// sampleBoard.push(new Card('Spades', 3));
//
// sampleHand = [];
// sampleHand.push(new Card('Spades', 6));
// sampleHand.push(new Card('Diamonds', 6));
//
// sampleHand1 = [];
// sampleHand1.push(new Card('Diamonds', 4));
// sampleHand1.push(new Card('Spades', 4));
//
// console.log(handLogic.getRanking(sampleHand, sampleBoard));
// console.log(handLogic.getRanking(sampleHand1, sampleBoard));


// //two pair vs house
// sampleBoard = [];
// sampleBoard.push(new Card('Spades', 2));
// sampleBoard.push(new Card('Hearts', 2));
// sampleBoard.push(new Card('Clubs', 10));
// sampleBoard.push(new Card('Spades', 4));
// sampleBoard.push(new Card('Spades', 3));
//
// sampleHand = [];
// sampleHand.push(new Card('Spades', 6));
// sampleHand.push(new Card('Diamonds', 6));
//
// sampleHand1 = [];
// sampleHand1.push(new Card('Diamonds', 10));
// sampleHand1.push(new Card('Spades', 10));
//
// console.log(handLogic.getRanking(sampleHand, sampleBoard));
// console.log(handLogic.getRanking(sampleHand1, sampleBoard));
