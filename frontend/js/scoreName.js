var sScoreName;  //Variabel für die Settings
var playerName = "";
   
var ScoreName = {
    settings: {
        panel: "#player-names",
    },
    
    init: function() {
       sScoreName = this.settings; //this auf die variable prägen
        
    },
    
    //Bindet Namens wahl Buttons 
    bindVoteButtons: function () { //bind funktion für die Buttons
        $("#player-names .btn").on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            console.log("ScoreName: Button ID = "+ buttonID);
            
            playerName = buttonID;
            ScoreName.showScoreName(buttonID);
        });
    },
    
    //Fügt Buttons zur Namens Auswahl hinzu
    saveScoreNames: function (msg) {
        console.log(msg);
        
        for(var i = 0; i < msg.length; i++) {
            $(sScoreName.panel).append('<button type="button" class="btn btn-default" id=vote-button data-ID="' + msg[i] + '">' + msg[i] + '</button>');
        }
    },
    
    //Verteckt alle Karten zu beginn
    showScoreName: function (playerName) {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sScoreName.panel + i).html("<h3>" + playerName +"</h3>");
        }
    },
};