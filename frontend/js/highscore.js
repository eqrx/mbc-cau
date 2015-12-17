var sHighscore;  //Variabel für die Settings
   
var Highscore = {
    settings: {
        score: $("#highscore"),
    },
    
    init: function(cards) {
        sHighscore = this.settings; //this auf die variable prägen
        
        this.printHighscore(cards);
    },
    
    printHighscore: function (cards) {
        for(var i = 0; i < cards.length; i++) {
           sHighscore.score.append("<tr><td><h4>" + cards[i].name + "</h4></td><td><h4>" + cards[i].votes + "</h4></td></tr>");
        }
    },
};