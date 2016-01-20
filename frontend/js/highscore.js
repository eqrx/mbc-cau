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
    },
    
    init: function(timer) {
        sHighscore = this.settings; //this auf die variable prägen
        
        var start = 0;
        highscoreSave = new Array();
        
        Highscore.printHighscore(highscoreSave, 0);
        
        if (timer == true) {
            var highscoreSetTimer = setInterval(function() {start = Highscore.printHighscore(highscoreSave, start) }, sHighscore.updateTime);
        }
    },
    
    //Object zum Speichern einer Karte mit Votes
    Player: function (name, votes) {
        this.name = name;
        this.votes = votes;
    },
    
    //Erstellt eine Highscore Liste die auf denn Bildschirm angepasst ist
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
    
    //Speichert denn Highscore ins Array
    saveHighscore: function (msg) {
        console.log("Highscore: saveHighscore");
        
        highscoreSave = new Array();
        
        for(var name in msg["choices"] ) {
            console.log("CardSet: " + msg["choices"][name]["player"]);
            Highscore.updateHighscore(msg["choices"][name]);
        }
    },
    
    updateHighscore: function (player) {
         console.log("Highscore: updateHighscore " + player);
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
    
    //update': {'card': '<Karteninhalt>', "player": <Spielername>, "score":  <Punktestand der Karte>}
};