var sCardSet;  //Variabel für die Settings
var cardSet;

var CardSet = {        
    settings: {
        fadeTime: 1000,
        updateTime: 5000,
        maxPanels: 4,
        panel: '#card-panel-',
        text: '#card-text-',
        vote: '#card-vote-',
    },
    
    init: function() {
        sCardSet = this.settings; //this auf die variable prägen
        
        cardSet = new Array();
        
        CardSet.cardHide();
    },
    
    //Verteckt alle Karten zu beginn
    cardHide: function () {
        for(var i = 0; i < sCardSet.maxPanels; i++) {
            $(sCardSet.panel + i).hide();
        }
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(cards, next) {
        if (cards.length > 0) {
            $(sCardSet.panel + next.nextPanel).fadeOut(sCardSet.fadeTime, function () { //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
                $(sCardSet.text + next.nextPanel).html(cards[next.nextCard].name); //Verändert denn Text der Karte
                $(sCardSet.vote + next.nextPanel).html("Votes: " + cards[next.nextCard].votes); //Verändert die Votes der Karte
                
                 next.nextCard++; //Auswahl der Nächsten Karte ausgegeben werden soll
                if( next.nextCard >= cards.length) {
                    next.nextCard = 0;
                }
                   
                next.nextPanel++; //Auswahl des Nächsten Panels welches verändert werden soll
                if(next.nextPanel >= sCardSet.maxPanels) {
                    next.nextPanel = 0;
                }
            }).fadeIn(sCardSet.fadeTime);
            
            return next;
        }
    },
    
    //Object { card: "white-f", score: 1, player: "name-a" }
    saveCard: function(msg) {
        
    },
};