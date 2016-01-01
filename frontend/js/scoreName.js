var sScoreName;  //Variabel für die Settings
var playerName = "";
   
var ScoreName = {
    settings: {
        panel: "player-names",
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
        });
    },
    
    saveScoreNames: function (msg) {
        console.log(msg);
        
        for(var i = 0; i < msg.lenght; i++) {
            $(sScoreName.panel).append('<button type="button" class="btn btn-default" id=vote-button data-ID="' + msg[i] + '">' + msg[i] + '</button>');
        }
    },
};