var sSocket;  //Variabel für die Settings
var socket;  //= io.connect("https://141.22.27.231"); //Socket Variable

var Socket = {

    settings: {
        address: "http://192.168.5.128", //"https://141.22.27.231",  //Addresse auf die sich Verbunden wird
        
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
        
        Socket.emitRequest();
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
    
    bindError: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onError, function (msg) {
            console.log("Socket: Error");
            
            
        });
    },
    
    bindScorenames: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onScorenames, function (msg) {
            console.log("Socket: Scorenames");
            console.log(msg["names"]);
            
        });
    },
    
    bindHandout: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onHandout, function (msg) {
            console.log("Socket: Handout");
            console.log(msg["hand"]);
            
            var temp = msg["hand"];
            for(var i = 0; i < temp.lenght; i++) {
                console.log(temp[i]);
            }
            
            WhiteCard.cardUpdate(msg["hand"]);
        });
    },
    
    bindUpdateCardSet: function () {
        socket.on(sSocket.onUpdate, function (msg) {
            console.log("Socket: Update");
            console.log(msg);
            
        });
    },
    
    emitVote: function (card, player) { //Sendet Votes zum Server
        socket.emit(sSocket.emitVote, {"card": card, "player": player});
    },
    
    emitRequest: function () { //Sendet Request des Datensatzes an Server
        socket.emit(sSocket.emitSetRequest, "");
    },
    
    parseTurnMsg: function (msg) {
        console.log(msg);
        console.log(msg["card"]);
        blackCard = msg["card"];
        
        console.log(msg["duration"]);
        duration = msg["duration"];
        
        cardSet = new Array();
        //for (var i = 0; i < msg["choices"].lenght; i++) {
            console.log(msg["choices"]);
            temp = JSON.stringify(msg["choices"], null, 4);
            console.log(temp);
            cardSet.push(temp);
        //}   
    },
    
    parseHandout: function (msg) {
        console.log("Socket: Handout");
    
        console.log(msg["hand"]);
        return msg["hand"];
    },
};