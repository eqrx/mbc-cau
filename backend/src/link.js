var winston = require("winston");
var fs = require("fs");

// Represents a remote player
module.exports.Player = function(socket, game, storage) {
  // True if player has chosen this round
  this.hasChoosen = false;
  // Current hand
  this.hand = [];
  
  this.game = game;
  this.storage = storage;
  
  // Connection to the player
  this.socket = socket;
  // Register handlers
  this.socket.on('request', this.onRequest.bind(this));
  this.socket.on('choice', this.onChoice.bind(this));
};

var Player = module.exports.Player;

// Called if player requests hand
module.exports.Player.prototype.onRequest = function(data) {
  if (!this.hand) {
    winston.verbose("Player #%s has requested a hand" + this.socket.id);
    // Player has no hand. Record that
    this.hasRequested = true;
    // Request hand from game
    this.hand = this.game.requestHand();
  } else {
    // Hand has already been requested, player is a hamburglar.
    // Just give him his hand again ...
    winston.warn("Player #%s has requested a hand more than once", this.socket.id);
  }
  
  // Pack hand into message
  var outdata = {"hand": this.hand};
  winston.debug("Sending hand to player #%s: ", this.socket.id, outdata);
  // Relay it to client
  this.socket.emit("handout", outdata);
};

// Player has chosen a card
module.exports.Player.prototype.onChoice = function(data) {
  // Get score name
  var name = data.name;
  // Take card from message
  var card = data.card;
  
  if (this.hasChoosen) {
    // Player has already chosen. Complain and reject
    winston.warn("Player #%s has chosen more than once", this.socket.id);
    // Tell the player that we don't like him
    this.socket.emit("illegal", null);
    // Bail out
    return;
  }

  if(!this.hand) {
    // Player chooses without a hand. Invalid, off you go
    winston.warn("Player #%s has chosen with a hand", this.socket.id);
    this.socket.emit("illegal", null);
    return;
  } else if (this.hand.indexOf(card) < 0 && ! (card in this.game.choices)) {
    // Card is neither in hand nor in game, reject
    winston.warn("Player #%s has chosen a card neither in hand, nor in game: %s", this.socket.id, card);
    this.socket.emit("illegal", null);
    return;
  }

  if(this.storage.scoreNames.indexOf(name) < 0) {
    // Score name is illegal, reject
    winston.warn("Player #%s has chosen an illegal score name", this.socket.id);
    this.socket.emit("illegal", null);
    return;
  }

  // 300 checks later

  // Player has not yet chosen, note that he has done now
  this.hasChoosen = true;

  // Player has not yet chosen. Allow it.
  winston.verbose("Player #%s is choosing the card \"%s\" with name \"%s\"", this.socket.id, card, name);

  // Choose the card
  this.game.choose(card, name);
};

// Game has entered new turn
module.exports.Player.prototype.onNewTurn = function() {
  // Reset hand and choice blocker
  this.hand = null;
  this.hasChoosen = false;
  winston.silly("Player #%s has been reset for new round", this.socket.id);
};

// Handles all player connections
module.exports.Link = function(storage) {
  // Take configuration
  this.storage = storage;

  this.game = null;

  // List of all players
  this.players = [];
};

// Connect to UNIX-Socket
module.exports.Link.prototype.connect = function() {
  winston.debug("Setting up connection");
  // Create HTTP-Server
  this.http = require('http').createServer();
  // Create WebSocket-Server
  this.io = require('socket.io')(this.http);
  // Register handles
  this.io.on('connection', this.onConnection.bind(this));
  this.io.on('disconnect', this.onDisconnection.bind(this));
  this.io.on('error', this.onError.bind(this));
  // Make Server listen on UNIX-Socket
  this.http.listen(this.storage.socketPath, this.setSocketPermissions.bind(this));
};

// Assemble message for turn info
module.exports.Link.prototype.getTurnData = function() {
  // Take data from game
  return {"card": this.game.card, "choices": this.game.choices, "duration": this.game.nextTurnTime - (new Date()).getTime(), "highscore": this.storage.score};
};

// Fix file permissions of created UNIX-Socket after it has been created
module.exports.Link.prototype.setSocketPermissions = function() {
  // Path is set up with secure permissions
  winston.debug("Setting permissions of socket %s to %d", this.storage.socketPath, this.storage.socketPermissions)
  fs.chmodSync(this.storage.socketPath, this.storage.socketPermissions);
  winston.verbose("Now listening for clients");
};

// Called when errors were made
module.exports.Link.prototype.onError = function(data) {
  winston.error("Errors were made: ", data);
};

// Called if new player connects
module.exports.Link.prototype.onConnection = function(socket) {
  winston.verbose("Player #%s has joined", socket.id);
  // Create player object
  var player = new Player(socket, this.game, this.storage);
  // Reset player
  player.onNewTurn();

  // Give allowed score names to player
  var data = {"names": this.storage.scoreNames};
  winston.debug("Sending score names to new player #%s: ", player.socket.id, data);
  player.socket.emit("names", data);
  
  // Tell player a round is going
  data = this.getTurnData();
  winston.debug("Sending turn data to new player #%s: ", player.socket.id, data);
  player.socket.emit("turn", data);
  
  // Remember player
  this.players.push(player);
};

// Called if player leaves.
module.exports.Link.prototype.onDisconnection = function(socket) {
  winston.verbose("Player # %s has left", this.socket.id);
  // Remove player from list
  this.players.splice(this.players.indexOf(player, 1));
};

// Called when some player choses a card
module.exports.Link.prototype.onChoice = function(card, score, player) {
  // Assemble data of choice
  var data = {"card": card, "score": score, "player": player};
  winston.debug("Propagating choice to all players: ", data);
  // Relay data to all players
  this.io.emit("update", data);
};

// Called when game entered a new turn
module.exports.Link.prototype.onNewTurn = function() {
  // Reset all players
  this.players.forEach(function(player) {
    player.onNewTurn();
  });
  // Tell all players a new turn has started
  var data = this.getTurnData();
  winston.debug("Propagating new turn information to all players: ", data);
  this.io.emit("turn", data);
};
