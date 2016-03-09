var winston = require('winston');
var shuffle = require('shuffle-array');

// Game handles the actual gameplay
module.exports.Game = function(storage, link) {
  this.storage = storage;
  this.link = null;
  
  // Timer handle for new turns
  this.turntimer = null;
  // Timestamp of next turn start
  this.nextTurnTime = null;

  // Current black card
  this.blackCard = null;
  // Chosen cards of this round
  this.choices = {};
  // Cards that have not yet been chosen
  this.possibleHandouts = null;
};

// Commence next turn
module.exports.Game.prototype.performNextTurn = function() {
  // Clear old turn timer
  if(this.turntimer !== null) {
    clearInterval(this.turntimer);
  }
  // Delay to next round
  var delay = this.storage.turnDuration;
  this.nextTurnTime = (new Date()).getTime() + delay;
  // Prime timer
  this.turntimer = setInterval(this.performNextTurn.bind(this), delay);
  // Pick black card
  this.card = this.storage.blackCards[Math.floor(Math.random() * this.storage.blackCards.length)];

  // Determine winner
  var winnerName = null;
  var winnerScore = 0;
  // Iterate over all chosen cards
  for (var card in this.choices) {
    // Get card name and score
    var score = this.choices[card].score;
    var name = this.choices[card].player;
    // Check if score if higher than winner score
    if(score > winnerScore) {
      // Take over winner
      winnerScore = score;
      winnerName = name;
    }
  }
  // Check if somebody has played
  if(winnerName !== null) {
    winston.verbose("Winner is %s", winnerName);
    // Add winner to database if he has never played
    if(!(winnerName in this.storage.score)) {
      this.storage.score[winnerName] = 0;
    }
    // Give winner one point and write out new score list
    this.storage.score[winnerName] += 1;
    this.storage.updateScore();
  } else {
    winston.verbose("Nobody played last round");
  }
  
  // Dump choices
  this.choices = {};
  // All white cards are free for handout
  this.possibleHandout = this.storage.whiteCards.splice();
  // Shuffle handout
  shuffle(this.possibleHandout);

  winston.verbose("New turn has begun, next turn in %d seconds, black card is \"%s\"", delay, this.card);
  
  // Inform all players about new turn
  this.link.onNewTurn();
};

// Request a hand of four cards for a player
module.exports.Game.prototype.requestHand = function() {
  // Hand goes here
  var hand = null;
  var possibleHandout = null;
  if (this.possibleHandout.length >= 4) {
    // Enough cards in possibleHandout ... take these
    hand = this.possibleHandout.slice(0, 4);
    winston.silly("Enough white cards");
  } else if (this.possibleHandout.length > 0) {
    // possibleHandout has 1..3 cards. Take these ...
    hand = this.possibleHandout;
    this.possibleHandout = [];
    // plus some cards that have already been played ... nobody will notice
    possibleHandout = this.storage.whiteCards.slice();
    shuffle(possibleHandout);
    hand.concat(hand.slice(0, 4-hand.length));
    winston.silly("White cards left");
  } else {
    // possibleHandouts is empty. Take some cards that have already been played
    possibleHandout = this.storage.whiteCards.slice();
    shuffle(possibleHandout);
    hand = possibleHandout.slice(0, 4);
    winston.silly("No white cards left");
  }
  return hand;
};

// Chose a card (called by a player)
module.exports.Game.prototype.choose = function(card, name) {
  // Add card to choice if has not been played yet
  if(!(card in this.choices)) {
    // Remember the player
    this.choices[card] = {"player": name, "score": 0};
  }
  
  // Give the card a point
  this.choices[card].score += 1;

  winston.silly("New choice set is ", this.choices);
  
  // Inform all players about choice
  this.link.onChoice(card, this.choices[card].score, this.choices[card].player);
};
