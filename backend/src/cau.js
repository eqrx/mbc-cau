var winston = require("winston");
var argv = require("argv");

// Define program arguments and parse command line
var args = argv.option([
  {
    name: 'config',
    short: 'c',
    type: 'path',
    description: 'Path to the main configuration file'
  },
  {
    name: 'loglevel',
    short: 'l',
    type: 'string',
    description: 'Loglevel passed to winston'
  }
]).run();

// Check if loglevel is valid
var winstonlevels = ["error", "warn", "info", "verbose", "debug", "silly"];
if (winstonlevels.indexOf(args.options.loglevel) < 0) {
  throw "Passed loglevel is illegal";
}
// Check if configuration path is present
if (!args.options.config) {
  throw "Path not specified";
}

// Set loglevel and add timestamp to output
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':true});
winston.level = args.options.loglevel;
// TODO test this
//winston.handleExceptions();

winston.debug("Command line arguments are:", args);

// Import submodules
var storage = require("./storage.js");
var game = require("./game.js");
var link = require("./link.js");

// Get configuration
var storage = new storage.Storage();
storage.load(args.options.config);

// Create game and link instances
var game = new game.Game(storage);
var link = new link.Link(storage);

// Connect game and link
game.link = link;
link.game = game;

winston.verbose("Starting program");
// Connect link
link.connect();
// Engage first turn
game.performNextTurn();
