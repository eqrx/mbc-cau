var winston = require('winston');
var fs = require('fs');
var path = require('path');
// Ubuntu distribution on development server ships old software, 
// use this workaround
var pathIsAbsolute = require('path-is-absolute');

// Thrown if a configuration error was detected
module.exports.ConfigurationExeption = function(message, cause) {
  this.message = message;
  if(cause) {
    this.message += ", caused by " + cause.name + ": \"" + cause.message + "\"";
  }
  this.name = "ConfigurationExeption";
};

// Pull exception out of module to this scope
var ConfigurationExeption = module.exports.ConfigurationExeption;

// Stores all configuration data
module.exports.Storage = function() {
  // duration of a turn
  this.turnDuration = null;
  // Black cards
  this.blackCards = null;
  // White cards
  this.whiteCards = null;
  // Names that player can use for score names
  this.scoreNames = null;
  // High score list
  this.score = null;
  // Path of high score file
  this.scorePath = null;
  // Path of the listening UNIX-Socket
  this.socketPath = null;
  // Filesystem permission of UNIX-Socket
  this.socketPermissions = null;
};

// Write the score list to filesystem
module.exports.Storage.prototype.updateScore = function() {
  winston.verbose("Saving score to disk");
  // Pretty print JSON and overwrite old score
  fs.writeFileSync(this.scorePath, JSON.stringify(this.score, null, 2) + '\n', 'utf8');
  winston.debug("Score has been saved to disk");
};

// Load configuration
module.exports.Storage.prototype.load = function(configPath) {
  winston.verbose("Reading configuration");

  // Directory the configuration file lies in
  var configDir = path.dirname(configPath);

  var config = null;
  try {
    // Content of configuration file
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (exception) {
    throw new ConfigurationExeption("Data in \"" + definitionPath + "\" is invalid", exception);
  }

  // Read turnDuration and test if it is valid
  if (!("turnDuration" in config)) {
    throw new ConfigurationExeption("\"turnDuration\" entry not found in " + configPath);
  }
  this.turnDuration = parseInt(config.turnDuration);
  if (isNaN(this.turnDuration) || this.turnDuration < 1 || this.turnDuration > 480) {
    throw new ConfigurationExeption("\"" + this.turnDuration + "\" is not between 1 and 480");
  }
  // Convert turn duration to ms
  this.turnDuration *= 60 * 1000;

  // Read socketPath
  if (!("socketPath" in config)) {
    throw new ConfigurationExeption("\"socketPath\" entry not found in " + configPath);
  }
  this.socketPath = config.socketPath;

  // Read socketPermissions and test if is valid
  if (!("socketPermissions" in config)) {
    throw new ConfigurationExeption("\"socketPermissions\" entry not found in " + configPath);
  }
  this.socketPermissions = parseInt(config.socketPermissions);
  if (isNaN(this.socketPermissions)) {
    throw new ConfigurationExeption("\"socketPermissions\" is invalid");
  }

  // Read path of definition file
  if (!("definitionsPath" in config)) {
    throw new ConfigurationExeption("\"definitionsPath\" entry not found in " + configPath);
  }
  var definitionPath = config.definitionsPath;
  // Add path of configuration file to definitions path if not absolute
  if(!pathIsAbsolute(definitionPath)) {
    definitionPath = path.join(configDir, definitionPath);
  }
  var definitions = null;
  try {
    // Read definitions
    definitions = JSON.parse(fs.readFileSync(definitionPath, 'utf8'));
  } catch (exception) {
    throw new ConfigurationExeption("Data in \"" + definitionPath + "\" is invalid", exception);
  }
  this.blackCards = definitions.blackCards;
  // Require at least two black cards
  if (this.blackCards.length < 2) {
    throw new ConfigurationExeption("Not enough black cards");
  }
  // Require at least four white cards
  this.whiteCards = definitions.whiteCards;
  if (this.whiteCards.length < 4) {
    throw new ConfigurationExeption("Not enough white cards");
  }
  // Require at least two score names
  this.scoreNames = definitions.scoreNames;
  if (this.scoreNames.length < 2) {
    throw new ConfigurationExeption("Not enough score names");
  }

  // Read path of score file
  if (!("scorePath" in config)) {
    throw new ConfigurationExeption("\"scorePath\" entry not found in " + configPath);
  }
  this.scorePath = config.scorePath;
  // Add path of configuration file to score path if not absolute
  if(!pathIsAbsolute(this.scorePath)) {
    this.scorePath = path.join(configDir, this.scorePath);
  }
  // Create file if not present
  if (fs.existsSync(this.scorePath)) {
    try {
      this.score = JSON.parse(fs.readFileSync(this.scorePath, 'utf8'));
    } catch (exception) {
      throw new ConfigurationExeption("Data in \"" + this.scorePath + "\" is invalid", exception);
    }
  } else {
    this.score = {};
    fs.writeFileSync(this.scorePath, "{}\n", 'utf8');
  }

  winston.debug("Configuration parsed and ready");
};
