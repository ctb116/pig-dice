function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function Player(id) {
  this.id = id;
  this.totalScore = 0; //if user says hold, currentScore will be added to totalScore, if user gets one from the dice, total score won't be increased
  this.currentScore = 0; //sum of turn scores
  this.turnScore = 0; //the number on a dice
  this.winTotal = 0;
};

function Dice() {
  this.diceValue = 0;
}

function switchPlayer() {
  if (currentPlayerId === 0) {
    currentPlayerId = 1;
  }
  else {
    currentPlayerId = 0;
  }
}

function resetScores() {
  Object.keys(players).forEach(function(playerId) {
    players[playerId].totalScore = 0;
    players[playerId].currentScore = 0;
    players[playerId].turnScore = 0;
  });
}

Player.prototype.win = function() {
  if (this.totalScore >= 20) {
    console.log(this);
    console.log("Final winner is " + this.id);
    displayAllScores();
    $("#winnerPlayer").html("");
    $("#winnerPlayer").append("<p> The winner is player id " + this.id + "!</p>");
    $("#winnerPlayer").show();
    this.winTotal += 1;
    resetScores();
    displayAllScores();
    return true;
  }
  else {
    return false;
  }
}

Player.prototype.hold = function() {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
  this.turnScore = 0;
  if (this.win() === true) {
    //currentPlayer Win!
    console.log("END");
  }
  else {
    switchPlayer();
  }
}

Dice.prototype.roll = function(playerId) {
  this.diceValue = getRandomInt(6)+1;
  players[playerId].turnScore = this.diceValue;
  if (this.diceValue === 1) {
    players[playerId].currentScore = 0;
    switchPlayer();
  }
  else {
    players[playerId].currentScore += this.diceValue;
  }
}

var displayScores = function(playerId) {
  var divId = "#scorePlayer" + playerId;
  var currentPlayer = players[playerId];
  $(divId).html("");
  $(divId).append("<p>Total Score: "+currentPlayer.totalScore+"</p>");
  $(divId).append("<p>Current Score: "+currentPlayer.currentScore+"</p>");
  $(divId).append("<p>Turn Score: "+currentPlayer.turnScore+"</p>");
  $(divId).append("<p>Win Total: "+currentPlayer.winTotal+"</p>");
}

var displayAllScores = function() {
  Object.keys(players).forEach(function(playerId) {
    displayScores(playerId);
  });
}

var dice = new Dice();
var playerCounter = 0;
var players = {};
var currentPlayerId = 0;

$(document).ready(function() {
  //before push  => players = {}
  //after push => players = { player1's id: player1 }
  // { player1's id: player1, player2's id: player2 }

  var player1 = new Player(playerCounter);
  playerCounter++;
  players[player1.id] = player1;
  // players = { 0: player1 }
  var player2 = new Player(playerCounter);
  players[player2.id] = player2;
  // players = { 0: player1, 1: player2 }
  //playerCounter++;
  //player1 starts rolling dice
  displayScores(player1.id);
  displayScores(player2.id);
  $("#rollDiceButton").click(function(){
    $("#winnerPlayer").hide();
    //players = { 0: player1 }
    var currentPlayer = players[currentPlayerId];
    //As currentPlayerId is 0,
    //currentPlayer = players[0] = player1
    //if currentPlayerId is 1,
    //currentPlayer = players[1] = player2
    dice.roll(currentPlayerId);
    console.log(currentPlayer);
    displayScores(currentPlayer.id);

  });
  $("#holdButton").click(function(){
    $("#winnerPlayer").hide();
    var currentPlayer = players[currentPlayerId];
    currentPlayer.hold();
    console.log(currentPlayer);
    displayScores(currentPlayer.id);

  });
});
