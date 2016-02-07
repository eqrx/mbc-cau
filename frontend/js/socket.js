/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung
 * Modul Welches zuständig für die Socket verbindeungen ist.
 * !!! Greift auf Methoden der anderen Module zu !!!
 *
 * Mehtoden:
 * init();
 * bindConnect();
 * bindCardSet();
 * bindHighscore();
 * bindScorenames();
 * bindHandout();
 * bindHandout();
 * bindUpdateCardSet();
 * bindUpdateCardSet();
 * bindError();
 * emitVote(card);
 * parseTurnMsg(msg)
 *
*/

var sSocket;  //Variabel für die Settings
var socket;  //Socket Variable

var voteCard = new Array(); //Speicher für das Karten Set
var duration;   //Zeit bis zum ende der Runde

var Socket = {

    settings: {
        //Ausgehende Socket Signale
        emitVote: "choice",
        emitSetRequest: "request",
        
        //Eingehende Socket Signale
        onCardSet: "turn",
        onHighscore: "highscore",
        onError: "illegal",
        onScorenames: "names",
        onHandout: "handout",
        onUpdate: "update",
        
        errorConnect: "connect failed",
        errorMSG: "Server Connection failed",
    },
    
    /* Beschreibung:
     * Erstellt die socket Verbindung und binds auf Events.
     *
     * Parameter:
     * player: Auswahl zwischen Kiosk oder Client System
     */
    init: function(player) {
        //console.log("Init Socket!");
        sSocket = this.settings; //this auf die variable prägen
        
        socket = io();
        
        Socket.bindConnect();
        Socket.bindCardSet();
        Socket.bindHighscore();
        Socket.bindError();
        Socket.bindUpdateCardSet();
        
        if (player == true) {
            Socket.bindScorenames();
            Socket.bindHandout();
        }
    },
    
    //Bind Methoden
    bindConnect: function () { //Wird ausgeführt bei Erfolgreichem connect
        socket.on("connect", function () {  
            console.log("Socket: Connected!");
        });
    },
    
    
    /* ## Übermittlung Rundeninformationen (Bei neuer Runde und nach Verbindungsaufbau)
    'turn': {'card': '<Schwarze Karte>',
        'choices': {'<Karteninhalt>': {'player': <Spielername>, 'score': <Punktestand der Karte>},
                    '<Karteninhalt>': {'player': <Spielername>, 'score': <Punktestand der Karte>},}
        ,'duration': <Verbleibende Rundenzeit>} }
    */
    bindCardSet: function () {  //Socket bind für Karten Set sendungen der Weißen Karten und der Bereits gespielten karten
        socket.on(sSocket.onCardSet, function (msg) {
            //console.log("Socket: turn");
            
            cards = Socket.parseTurnMsg(msg);
        });
    },
    
    bindHighscore: function () { //Socket Bind für die Highscore Liste
        socket.on(sSocket.onHighscore, function (msg) {
            //console.log("Socket: Highscore");
            //console.log(msg);
            
            //TODO
        });
    },
    
    bindScorenames: function () { //Socket Bind für die Names Liste
        socket.on(sSocket.onScorenames, function (msg) {
            //console.log("Socket: Scorenames");
            
            ScoreName.saveScoreNames(msg["names"]);
        });
    },
    
    bindHandout: function () { //Socket Bind für die Weißen Karten auf die man Voten Kann
        socket.on(sSocket.onHandout, function (msg) {
            //console.log("Socket: Handout");
            //console.log(msg);
            
            WhiteCard.cardUpdate(msg["hand"]);
        });
    },
    
    bindUpdateCardSet: function () { //Socket Bind auf Die Update Nachrichten für die gespielten Nachrichten
        socket.on(sSocket.onUpdate, function (msg) {
            //console.log("Socket: Update");
            //console.log(msg);
            
            CardSet.saveCard(msg);
            Highscore.updateHighscore(msg);
        });
    },
    
    bindError: function () { //Socket Bind für fehler Meldungen von Server
        socket.on(sSocket.onError, function (msg) {
            console.log("Socket: Error");
            alert("Es ist ein fehler aufgetreten")
            
            console.log(msg);
        });
    },
    
    //Emits zum Server
    emitVote: function (card) { //Sendet Votes zum Server
        //console.log("Socket: emitVote");

        socket.emit(sSocket.emitVote, { "name": playerName, "card": card });
    },
    
    emitRequest: function () { //Sendet Request des Datsensatzes an Server
        socket.emit(sSocket.emitSetRequest, null);
    },
    
    
    parseTurnMsg: function (msg) {
        //console.log(msg);
        
        BlackCard.cardUpdate(msg["card"]);
        duration = msg["duration"];
        
        Highscore.saveHighscore(msg);
        CardSet.saveCardSet(msg);
        
        Socket.emitRequest(); //Vote Karten anfordern
    },
};