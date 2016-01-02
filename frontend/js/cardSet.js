var sCardSet;  //Variabel für die Settings
var setOfCards;
var cardSetTimer;
var next;

var CardSet = {        
    settings: {
        fadeTime: 1000,
        updateTime: 5000,
        maxPanels: 4,
        panel: '#card-panel-',
        text: '#card-text-',
        vote: '#card-vote-',
    },
    
    init: function(timer) {
        sCardSet = this.settings; //this auf die variable prägen
        
        next = new CardSet.Place(0, 0, 1);
        
        setOfCards = new Array();
        
        CardSet.cardHide();
        
        if (timer == true) {
            cardSetTimer = setInterval(function() { CardSet.cardUpdate(setOfCards, next) }, CardSet.settings.updateTime);  
        }
    },
    
    Place: function (nextCard, nextPanel, count) {
        this.nextCard = nextCard;
        this.nextPanel = nextPanel;
        this.count = count;
    },
    
    Card: function (name, votes) {
        this.name = name;
        this.votes = votes;
    },
    
    //Verteckt alle Karten und löscht inhalt
    cardHide: function () {
        for(var i = 0; i < sCardSet.maxPanels; i++) {
            $(sCardSet.panel + i).hide();
            $(sCardSet.text + i).html("");
            $(sCardSet.vote + i).html("");
        }
        
        next = new CardSet.Place(0, 0, 1);
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(cards, next) {
        if ((cards.length > 0 /*&& next.count <=  cards.length) || cards.length >= sCardSet.*maxPanels*/)) {
            console.log("CardsSet: cardUpdate")
            console.log(cards);
            $(sCardSet.panel + next.nextPanel).fadeOut(sCardSet.fadeTime, function () { //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
                $(sCardSet.text + next.nextPanel).html(cards[next.nextCard].name); //Verändert denn Text der Karte
                $(sCardSet.vote + next.nextPanel).html("Votes: " + cards[next.nextCard].votes); //Verändert die Votes der Karte
                
                next.count++;
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
    
    //Speichert das Update der gespielten Karten ins array
    saveCard: function(msg) {
        console.log("CardsSet: saveCard");
        var isInList = true;
        
        console.log(setOfCards.length);
        for(var i = 0; i < setOfCards.length; i++) { //Prüfen ob Carde schon in Liste vorhanden
            console.log(setOfCards.toString);
            console.log(setOfCards[i].name);
            if (setOfCards[i].name == msg["card"]) {
                isInList = false;
                setOfCards[i].vote = msg["score"];
                i = setOfCards.length;
            }
        }
        
        if (isInList == true) {
            setOfCards.push(new CardSet.Card(msg["card"], msg["score"]));
        } 
        
    },
    
    //Speichert berreits gespielt Karten ins Array
    saveCardSet: function (msg) {
        console.log("CardSet: saveCardSet");
        
        CardSet.cardHide();
        setOfCards = new Array();
        
        for(var name in msg["choices"] ) {
            console.log("CardSet: " + msg["choices"][name]);
            setOfCards.push(new CardSet.Card(name, msg["choices"][name]["score"]));
        }
        
        for(var i = 0; i < msg.length; i++) {
            
        }
    },
};