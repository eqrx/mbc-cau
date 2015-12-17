var sSocket;  //Variabel für die Settings
var socket// = io.connect("127.0.0.1:14004"); //= io.connect("https://141.22.27.231"); //Socket Variable

var Socket = {
    settings: {
        //address: "http://127.0.0.1:3000",
        address: "https://141.22.27.231/", //"https://141.22.27.231",  //Addresse auf die sich Verbunden wird http://127.0.0.1:3000
        
        emitVote: "chat message",
        emitSetRequest: "request",
        
        onWhiteCard: "hand",
        onBlackCard: "handout",
        onCardSet: "turn",
        
        requestSet: "turn",
        requestHighscore: "",
        requestWhiteCard: "",
        
        errorConnect: "connect failed",
        errorMSG: "Server Connection failed",
    },
    
    init: function() {
        sSocket = this.settings; //this auf die variable prägen
        
        //alert(sSocket.address);
         socket = io("https://141.22.27.231/");
        
        Socket.bindVoteButtons();
        Socket.bindSocketSet();
    },   
    
    bindVoteButtons: function () { //bind funktion für die Buttons
        $(".btn").on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            
            Socket.sendVote(buttonID);
        });
    },
    
    bindSocketSet: function () {  //Socket bind für Karten Set sendungen der Weißen Karten und der Bereits gespielten karten
        socket.on(sSocket.onCardSet, function (msg) {
            alert("Hallo World");
            $('#messages').append($('<li>').text("update " + msg["card"] + " " + msg["score"] + " " + msg["player"]));
        });
    },
    sendVote: function (buttonID) { //sendet Votes zum Server
        if (buttonID == b0) {
            socket.emit(sSocket.emitVote, VOTE_MSG);
        }
    },
    
    sendSetRequest: function () { //Requestet die Liste von Bereits gespielten Karten
        socket.emit(sSocket.emitSetRequest, "")
    },
    
    
    sendHighscoreRequest: function() { //Requestet denn Spieler Highscore
        
    },
    
    errorHandling: function () { //Error Handling der socket verbindungen
        socket.on(sSocket.errorConnect, function () {
            alert(sSocket.errorMSG);
        });
    },
    
    bindSocketHighscore: function (msg) { //Socket Bind für denn Highscore
       
    },
};
/*
 *    bindSocketSet: function () {  //Socket bind für Karten Set sendungen der Weißen Karten und der Bereits gespielten karten
        socket.on(sSocket.onWhiteCard, function (msg) {
            $('#messages').append($('<li>').text("update " + msg["card"] + " " + msg["score"] + " " + msg["player"]));
        });
    },
    
    bindSocketWhiteCard: function () {
        socket.on(sSocket.onBlackCard, function (msg) {
             $('#messages').append($('<li>').text("turn " + msg["card"] + " " + JSON.stringify(msg["choices"], null, 4) + " " + msg["duration"]));
        });
    },
 *    
	socket.on('turn', function(msg){
	  $('#messages').append($('<li>').text("turn " + msg["card"] + " " + JSON.stringify(msg["choices"], null, 4) + " " + msg["duration"]));
	  //socket.emit('request', {'id': 1})
    });

    socket.on('handout', function(msg){
      $('#messages').append($('<li>').text("hand " + msg["hand"]));
      //socket.emit('choice', {'card': msg["hand"][0], 'name': "name-a"})
    });
    socket.on('update', function(msg){
      $('#messages').append($('<li>').text("update " + msg["card"] + " " + msg["score"] + " " + msg["player"]));
    });
     
    socket.on('illegal', function(msg){
      $('#messages').append($('<li>').text("fail"));
    });*/