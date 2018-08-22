function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function Player(id) {
  this.id = id;
  this.totalScore = 0; //if user says hold, currentScore will be added to totalScore, if user gets one from the dice, total score won't be increased
  this.currentScore = 0; //sum of turn scores
  this.turnScore = 0; //the number on a dice
};

var players = {};

function Dice() {
  this.diceValue = 0;
}


Dice.prototype.roll = function(playerId) {
  this.diceValue = getRandomInt(6)+1;
  players[playerId].turnScore = this.diceValue;
}


$(document).ready(function() {
  var playerCounter = 0;
  var player1 = new Player(playerCounter);
  var dice = new Dice();

  players[player1.id] = player1;
  //before push  => players = {}
  //after push => players = { player1's id: player1 }
  // { player1's id: player1, player2's id: player2 }
  //
  playerCounter++;
  var player2 = new Player(playerCounter);

  dice.roll(player)
  players[player2.id] = player2;

});
