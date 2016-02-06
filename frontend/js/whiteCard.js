/* 
 * Author:  Mike Wuestenberg
 *
*/

var sWhiteCard;  //Variabel für die Settings
   
var WhiteCard = {        
    settings: {
        fadeTime: 1000, //Zeit die ein Fade dauert
        maxPanels: 4,
        panel: "#white-card-panel-",
        text: "#white-card-text-",
        vote: "#white-card-vote-",
        
        panelBind: ".white-card",
        
        voteRow: "#vote",
    },
    
    init: function() {
        sWhiteCard = this.settings; //this auf die variable prägen
        
        $(sWhiteCard.voteRow).hide();
        
        WhiteCard.bindVotePanelOnClick();
        WhiteCard.bindVotePanelOnMouseOver();
    },
    
    //Bindet Vote Panels
    bindVotePanelOnClick: function () { //bind funktion für die Buttons
        $(sWhiteCard.panelBind).on("click", function() {
            var panelID = $(this).attr("data-panelID"); //Erkennt welche karte gedrückt wurde

            WhiteCard.vote(panelID);   
        });
    },

    bindVotePanelOnMouseOver: function () {
        $(sWhiteCard.panelBind).on("mouseover", function() {
            var panelID = $(this).attr("data-panelID")
            
            $(sWhiteCard.panel + panelID).css("border-color", "red");
        });
    
        $(sWhiteCard.panelBind).on("mouseout", function() {
            var panelID = $(this).attr("data-panelID")
            
            $(sWhiteCard.panel + panelID).css("border-color", "black");
        });
    },
    
    //Verteckt alle Karten zu beginn
    cardHide: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).hide();
            $(sWhiteCard.text + i).html("");
        }
    },
    
    //Blendet alle karten ein
    cardShow: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).fadeIn(sWhiteCard.fadeTime);
        }
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(card) {
        voteCard = card; //Speichern zum Voten
        
        $(sWhiteCard.voteRow).fadeOut(sWhiteCard.fadeTime, function() {
            for(var i = 0; i < sWhiteCard.maxPanels; i++) {
                $(sWhiteCard.text + i).html(card[i]); //Verändert denn Text der Karte
                
                //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
                //$(sWhiteCard.panel + i).fadeOut(sWhiteCard.fadeTime, WhiteCard.cardUpdateHelper(card, i)).fadeIn(sWhiteCard.fadeTime);
            }
        }).fadeIn(sWhiteCard.fadeTime);
    },
    
    //Hilfs Methode zum verändern des Textes der Weißen Karten
    cardUpdateHelper: function (card, i) {
         $(sWhiteCard.text + i).html(card[i]); //Verändert denn Text der Karte
    },
    
    //Helper Funktion um von Gedrückten Button auf die gewählte karte zu schließen
    vote: function (panelID) {
        if (playerName == "") {
            alert("Bitte wähle erst einen Namen");
        } else {
            var card;
            
            card = voteCard[panelID];
            
            //WhiteCard.cardHide();
            $(sWhiteCard.voteRow).fadeOut(sWhiteCard.fadeTime, function() {
                Socket.emitVote(card); //Sendet die wahl an Server
            });
        }
    },
};