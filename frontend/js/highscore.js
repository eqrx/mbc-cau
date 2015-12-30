var sHighscore;  //Variabel für die Settings
   
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
    
    init: function(cards, timer) {
        sHighscore = this.settings; //this auf die variable prägen
        
        var start = 0;
        
        this.printHighscore(cards, 0);
        
        if (timer == true) {
            var highscoreSetTimer = setInterval(function() {start = Highscore.printHighscore(cards, start) }, sHighscore.updateTime);
        }
    },
    
    printHighscore: function (cards, start) {
        rows = this.getRows();
        
        this.deletHighscoreTable();
        
        for(var i = 0; i < rows; i++) {
           if (start < cards.length) {
                sHighscore.score.append("<tr><td><h4>" + cards[start].name + "</h4></td><td><h4>" + cards[start].votes + "</h4></td></tr>");
                start++;
           } else {
                start = 0;
                i = rows;
           } 
        }
        
        return start;
    },
    
    getRows: function () {
        var rows = 0;
        
        var height = $(window).innerHeight() - $(sHighscore.rowHead).outerHeight() - $(sHighscore.trHead).outerHeight() - $(sHighscore.rowFooter).outerHeight();                
        rows = Math.floor(height / sHighscore.rowPixl);

        return rows;
    },
    
    deletHighscoreTable: function () {
        var table = document.getElementById(sHighscore.tableID);

        while(table.rows.length > sHighscore.tableStart) {
          table.deleteRow(sHighscore.tableStart);
        }
    }
};