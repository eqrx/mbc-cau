var sWhiteCard;  //Variabel für die Settings
   
var WhiteCard = {        
    settings: {
        fadeTime: 1000,
        updateTime: 5000,
        maxPanels: 4,
        panel: '#white-card-panel-',
        text: '#white-card-text-',
        vote: '#white-card-vote-',
    },
    
    init: function() {
        sWhiteCard = this.settings; //this auf die variable prägen
        
        //this.cardHide();
    },
    
    //Verteckt alle Karten zu beginn
    cardHide: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).hide();
        }
    },
    
    //Blendet alle karten ein
    cardShow: function () {
        for(var i = 0; i < sWhiteCard.maxPanels; i++) {
            $(sWhiteCard.panel + i).fadeIn(sCardSet.fadeTime);
        }
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(card) {
        console.log("WhiteCard: Update");
        console.log(card);
        console.log(card[0]);
        
		for(var i = 0; i < sWhiteCard.maxPanels; i++) {
			$(sWhiteCard.panel + i).fadeOut(sWhiteCard.fadeTime, function () { //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
                console.log(sWhiteCard.text + i);
                console.log(card[i]);
				$(sWhiteCard.text + i).html(card[i]); //Verändert denn Text der Karte
				
			}).fadeIn(sCardSet.fadeTime);
        }
    },
    
    bindVoteButtons: function () { //bind funktion für die Buttons
        $(".btn").on("click", function() {
            var buttonID = $(this).attr("data-ID"); //Erkennt welcher Button gedrückt wurde
            
            Socket.sendVote(buttonID);
        });
    },
};