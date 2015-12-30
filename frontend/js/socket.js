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
        onScorenames: "scorenames",
        
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
        
        socket.emit("connection", "")
    },
    
    bindConnect: function () {
        socket.on("connect", function () {  
            console.log("Socket: Connected!");
        });
    },
    
    bindCardSet: function () {  //Socket bind für Karten Set sendungen der Weißen Karten und der Bereits gespielten karten
        socket.on(sSocket.onCardSet, function (msg) {
            console.log("Socket: turn");
            
            cards = Socket.parseMsg(msg);
        });
    },
    
    bindHighscore: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onHighscore, function (msg) {
            console.log("Socket: Highscore");
            
            
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
            
            
        });
    },
    
    emitVote: function (card) { //Sendet Votes zum Server
        //socket.emit("","");
    },
    
    emitRequest: function () { //Sendet Request des Datensatzes an Server
        
    },
    
    parseMsg: function (msg) {
        console.log(msg);
        blackCard = msg["card"];
        duration = msg["duration"];
        
        cardSet = new Array();
        for (var i = 0; i < msg["choices"].lenght; i++) {
            cards.push(msg["choices"][i]);
            console.log(msg["choices"][i]); 
        }
            
    }
};