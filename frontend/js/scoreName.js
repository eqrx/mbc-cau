/* 
 * Author:  Mike Wuestenberg
 *
 * Beschreibung:
 * Modul welches zuständig für die Auswahl eines Spieler namens ist, und Anzeigen der Spielernamen die zur verfügung stehen
 *
 * Methoden:
 * init();
 * bindVoteButtons();
 * saveScoreNames(msg);
 * showScoreName(playerName);
*/

var sScoreName;  //Variabel für die Settings
var playerName = ""; //Spiechert Spieler Namen
   
var ScoreName = {
    settings: {
        panel: "#player-names",
        panelText: "#player-name-text",
    },
    
    init: function() {
        sScoreName = this.settings; //this auf die variable prägen
    },
    
    //Bindet Namens wahl Buttons 
    bindVoteButtons: function () { //bind funktion für die Buttons
        console.log("ScoreName: Button Bind");
        $(sScoreName.panel + " .btn").on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            
            playerName = buttonID;
            ScoreName.showScoreName(buttonID);
        });
    },

    /* Beschreibung:
     * Zeigt die auswählbaren Spielernamen an und die dazugehörigen Buttons
     *
     * Parameter:
     * msg: Nachricht mit denn Spielernamen vond er Socket schnittstelle
     */
    saveScoreNames: function (msg) {
        
        $(sScoreName.panel).empty();
        for(var i = 0; i < msg.length; i++) {
            $(sScoreName.panel).append('<button type="button" class="btn btn-default" id=vote-button data-ID="' + msg[i] + '">' + msg[i] + '</button>');
        }
        
        ScoreName.bindVoteButtons(); 
    },
    
    /* Beschreibung:
     * Versteckt nach auswahl eines Namens die Auswahl und Zeigt denn eigenen Namen dafür an
     *
     * Parameter:
     * playerName: Der Spielername
     */
    showScoreName: function (playerName) {
        $(sScoreName.panel).empty();
        $(sScoreName.panelText).html("Dein Name ist:");
        
        $(sScoreName.panel).append("<h3>" + playerName +"</h3>");
    },
};