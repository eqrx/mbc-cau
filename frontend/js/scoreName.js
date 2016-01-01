var sScoreName;  //Variabel für die Settings
var playerName = "";
   
var ScoreName = {
    settings: {
        panel: "player-names",
    },
    
    init: function() {
       sScoreName = this.settings; //this auf die variable prägen
        
    },
    
    saveScoreNames: function (msg) {
        for(var i = 0; i < msg.lenght; i++) {
            $(sScoreName.panel).append('<button type="button" class="btn btn-default" id=vote-button data-ID=nameB' + i + '>' + msg[1] + '</button>');
        }
    },
};