var sCardSet;  //Variabel für die Settings
var setOfCards;
var cardSetTimer;
var next;

var CardSet = {        
    settings: {
        fadeTime: 1000,     //Zeit die ein Fade benötigt
        updateTime: 5000,   //Intervall Zeit bis zum Austauschen einer Karte in der anzeige für das Karten Set
        maxPanels: 4,
        panel: '#card-panel-',
        text: '#card-text-',
        vote: '#card-vote-',
    },
    
    init: function(timer) {
        sCardSet = this.settings; //this auf die variable prägen
        
        setOfCards = new Array();
        next = new CardSet.Place(0, 0);
        
        CardSet.cardHide();
        
        if (timer == true) {
            cardSetTimer = setInterval(function() { next = CardSet.cardUpdate(setOfCards, next) }, CardSet.settings.updateTime);  
        }
    },
    
    //Object zum Speichern der Position im Panel und Karten Array
    Place: function (nextCard, nextPanel) {
        this.nextCard = nextCard;
        this.nextPanel = nextPanel;
    },
    
    //Object zum Speichern einer Karte mit Votes
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
        
        next = new CardSet.Place(0, 0);
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(cards, next) {
        console.log("CardsSet: cardUpdate")
        var count = 0;
        
        for(var i = 0; i < sCardSet.maxPanels; i++) { //Prüfen wie viele Karten angezeigt werden
            if($(sCardSet.text + i).html() != "") {
                count++;
            }
        }
        console.log("CardsSet: count " + count);
        if ((cards.length > 0 && cards.length > count )) {        
            //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
            $(sCardSet.panel + next.nextPanel).fadeOut(sCardSet.fadeTime, function () {                    
                $(sCardSet.text + next.nextPanel).html(cards[next.nextCard].name); //Verändert denn Text der Karte
                $(sCardSet.vote + next.nextPanel).html("Votes: " + cards[next.nextCard].votes); //Verändert die Votes der Karte

                next.nextCard++; //Auswahl der Nächsten Karte ausgegeben werden soll
                if( next.nextCard >= cards.length && cards.length > sCardSet.maxPanels) {
                    next.nextCard = 0;
                }
                   
                next.nextPanel++; //Auswahl des Nächsten Panels welches verändert werden soll
                if(next.nextPanel >= sCardSet.maxPanels) {
                    next.nextPanel = 0;
                }
            }).fadeIn(sCardSet.fadeTime);
        }
        return next;
    },
    
    //Updatet die Votes einer Karte
    voteUpdate: function (msg) {
        for(var i = 0; i < sCardSet.maxPanels; i++) { //Prüfen ob die Karte schon angezeigt wird
            if(msg["card"] == $(sCardSet.text + i).html()) { //Wenn schon vorhanden verändere Vote anzahl
                $(sCardSet.vote + i).html("Votes: " + msg["score"]); //Verändert die Votes der Karte
            }
        }
    },
    
    //Speichert das Update der gespielten Karten ins array
    saveCard: function(msg) {
        console.log("CardsSet: saveCard");
        var isInList = false;
        
        for(var i = 0; i < setOfCards.length; i++) { //Prüfen ob Carde schon in Liste vorhanden
            if (setOfCards[i].name == msg["card"]) { //Wenn die Karte vorhanden ist neue Votes Speichern
                isInList = true;
                setOfCards[i].votes = msg["score"];
                i = setOfCards.length;
            }
        }
        
        if (isInList == false) { //Wenn die Karte noch nicht ind er Liste ist Hinzufügen
            setOfCards.push(new CardSet.Card(msg["card"], msg["score"]));
        } else { //Votes auf dem Display Updaten
            CardSet.voteUpdate(msg);
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
        
        /*for(var i = 0; i < msg.length; i++) {
            
        }*/
    },
};