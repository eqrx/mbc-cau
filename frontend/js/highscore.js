/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung:
 * Modul welches für die Highscore liste zuständig ist. Aufgaben sind z.b. anzeigen neuer Highscore einträge
 * und errechnen wie viele einträge auf denn Bildschirm passen.
 *
 * Objekte:
 * Player(name, votes);
 * 
 * Methoden:
 * init(timer);
 * printHighscore(player, start);
 * getRows();
 * deletHighscoreTable();
 * saveHighscore(msg);
 * updateHighscore(player);
*/

var sHighscore;  //Variabel für die Settings
var highscoreSave;   

var Highscore = {
    settings: {
        score: $("#highscore"), //Name der Highscore Tabelle
        rowPixl: 60, //Höhe eines Eintrags der Highscore Tabelle
        
        updateTime: 5000,   //Zeit bis der nächste Satz einträge in der Highscore Tabelle angezeigt wird
        
        tableID: "highscore", //Name der Highscore Tabelle
        tableStart: 1,  //Start der Tabellen einträge
        
        rowHead: "#row-head",   //Name der Überschrift Zeile
        trHead: "#tr-head-row", //Name der ersten Tabellen Zeile
        rowFooter: "row-footer", //Name der Footer Zeile
        
        debugMsg: true,
    },
    
    /* Beschreibung:
     * Init funktion erstellt neues array für die Highscore liste und starte denn Timer
     *
     * Parameter:
     * timer: Wenn "true" wird der Timer gestartet
     */
    init: function(timer) {
        sHighscore = this.settings; //this auf die variable prägen
        
        var start = 0;
        highscoreSave = new Array();
        
        Highscore.printHighscore(highscoreSave, 0);
        
        if (timer == true) {
            var highscoreSetTimer = setInterval(function() {start = Highscore.printHighscore(highscoreSave, start) }, sHighscore.updateTime);
        }
    },
    
    debugMsg: function (msg) {
        if (sSocket.debugMsg == true) {
            console.log(msg);
        }
    },
    
    //Object zum Speichern einer Karte mit Votes
    Player: function (name, votes) {
        this.name = name;
        this.votes = votes;
    },
    
    /* Beschreibung:
     * Erstellt eine Highscore Liste die auf denn Bildschirm angepasst ist
     *
     * Parameter:
     * player: Highscore liste mit spielern und Votes
     * start: start position in der Higscore Liste
     */
    printHighscore: function (player, start) {
        rows = this.getRows();
        
        this.deletHighscoreTable();
        
        for(var i = 0; i < rows; i++) {
           if (start < player.length) {
                sHighscore.score.append("<tr><td><h4>" + player[start].name + "</h4></td><td><h4>" + player[start].votes + "</h4></td></tr>");
                start++;
           } else {
                start = 0;
                i = rows;
           } 
        }
        
        return start;
    },
    
    //Errechnet wie viele Tabellen Zeilen auf denn Bildschirm passen
    getRows: function () {
        var rows = 0;
        
        var height = $(window).innerHeight() - $(sHighscore.rowHead).outerHeight() - $(sHighscore.trHead).outerHeight() - $(sHighscore.rowFooter).outerHeight();                
        rows = Math.floor(height / sHighscore.rowPixl);

        return rows;
    },
    
    //Löscht Die Highscore Tabelle
    deletHighscoreTable: function () {
        var table = document.getElementById(sHighscore.tableID);

        while(table.rows.length > sHighscore.tableStart) {
          table.deleteRow(sHighscore.tableStart);
        }
    },
    
    /* Beschreibung:
     * Speichert denn Highscore ins Array
     *
     * Parameter:
     * msg: Nachricht von der Socket schnittstelle mit neuen Daten für die Hogscore liste
     */
    saveHighscore: function (msg) {        
        highscoreSave = new Array();
        
        Socket.debugMsg(msg.highscore);
        
        for(var name in msg["highscore"] ) {
            //console.log("CardSet: " + msg["choices"][name]["player"]);
            highscoreSave.push(msg["highscore"][name],msg["highscore"][score]);
        }
    },
    
    /* Beschreibung
     * Aktualisiert die Higscore liste in dem sie Local eingehende Nachrichten auf spieler Überprüft
     *
     * Parameter:
     * player: Der spieler welcher die Letzte Karte gevotet hat
     */
    updateHighscore: function (player) {         
        var isInList = false;
        
        for(var i = 0; i < highscoreSave.length; i++) { //Prüfen ob Spieler schon in Liste vorhanden
            if (highscoreSave[i].name == player["player"]) { //Wenn die Karte vorhanden ist neue Votes Speichern
                isInList = true;
                highscoreSave[i].votes++; //Votes hoch zählen
                i = highscoreSave.length;
            }
        }
        
        if (isInList == false) { //Wenn die Karte noch nicht ind er Liste ist Hinzufügen
            highscoreSave.push(new Highscore.Player(player["player"], 1));
        }
    },
};