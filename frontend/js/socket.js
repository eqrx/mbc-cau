var sSocket;  //Variabel für die Settings
var socket;  //Socket Variable

var blackCard;
var voteCard = new Array();
var duration;

var Socket = {

    settings: {        
        emitVote: "choice",
        emitSetRequest: "request",
        
        onCardSet: "turn",
        onHighscore: "highscore",
        onError: "illegal",
        onScorenames: "names",
        onHandout: "handout",
        onUpdate: "update",
        
        errorConnect: "connect failed",
        errorMSG: "Server Connection failed",
    },
    
    init: function() {
        console.log("Init Socket!");
        sSocket = this.settings; //this auf die variable prägen
        
        socket = io();
        
        Socket.bindConnect();
        Socket.bindCardSet();
        Socket.bindHighscore();
        Socket.bindError();
        Socket.bindScorenames();
        Socket.bindHandout();
        Socket.bindUpdateCardSet();
    },
    
    bindConnect: function () {
        socket.on("connect", function () {  
            console.log("Socket: Connected!");
        });
    },
    
    bindCardSet: function () {  //Socket bind für Karten Set sendungen der Weißen Karten und der Bereits gespielten karten
        socket.on(sSocket.onCardSet, function (msg) {
            console.log("Socket: turn");
            
            cards = Socket.parseTurnMsg(msg);
        });
    },
    
    bindHighscore: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onHighscore, function (msg) {
            console.log("Socket: Highscore");
            console.log(msg);
            
        });
    },
    
    bindScorenames: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onScorenames, function (msg) {
            console.log("Socket: Scorenames");
            
            ScoreName.saveScoreNames(msg["names"]);
        });
    },
    
    bindHandout: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onHandout, function (msg) {
            console.log("Socket: Handout");
            console.log(msg);
            
            WhiteCard.cardUpdate(msg["hand"]);
        });
    },
    
    bindUpdateCardSet: function () {
        socket.on(sSocket.onUpdate, function (msg) {
            console.log("Socket: Update");
            console.log(msg);
            
            CardSet.saveCard(msg);
        });
    },
    
    bindError: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onError, function (msg) {
            console.log("Socket: Error");
            
            console.log(msg);
        });
    },
    
    emitVote: function (card) { //Sendet Votes zum Server
        console.log("Socket: emitVote");
        console.log(playerName);

        socket.emit(sSocket.emitVote, { "name": playerName, "card": card });
    },
    
    emitRequest: function () { //Sendet Request des Datensatzes an Server
        socket.emit(sSocket.emitSetRequest, null);
    },
    
    parseTurnMsg: function (msg) {
        console.log(msg);
        
        blackCard = msg["card"];
        duration = msg["duration"];
        
        CardSet.saveCardSet(msg["choices"]);
        console.log("1:");
        console.log(msg["choices"]);
        console.log("2:");
        console.log(msg["choices"][1]);
        console.log("3:");
        console.log(msg.choices[0]);
        
        Socket.emitRequest(); //Vote Karten anfordern
    },
};