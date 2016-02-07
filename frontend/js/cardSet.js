/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung:
 * das Modul CardSet ist für das anzeigen bereits gespielter Karten zuständig
 * dazu gehört das ein- und ausblenden aber auch das Speichern der daten in ein Array
 *
 * Objekte:
 * Place(nextcard, nextPanel); //Speichert die nächste Karte und anzeige Position
 * Card(name, votes); //Speichert Name und Votes einer Karte
 *
 * Methoden;
 * init(timer);
 * cardHide();
 * cardUpdate(cards, next);
 * voteUpdate(msg);
 * saveCard(msg);
 * saveCardSet(msg);
*/


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
    
    /* Beschreibung:
     * Die Init funktion erzeugt ein neues Array zum Speichern des Kartens Sets und der
     * nächsten Anzeige Position. Außerdem versteckt es alle Karten zu beginn und starten denn Timer
     *
     * Parameter:
     * timer: Wenn "true" wird der Timer gestartet
     */
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
    
    /* Beschreibung:
     * Methode zum updaten der angezeigten Karten auf dem Display
     *
     * Parameter:
     * cards: Die Karten die gespielt wurden;
     * next: Die nächste Anzeige position und die nächste Karte die angezeigt werden soll
     * 
     */
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
    
    /* Beschreibung:
     * Updatet die Votes einer Karte
     *
     * Parameter:
     * msg: die Nachricht von der Socket schnitstelle mit denn Votes
     */
    voteUpdate: function (msg) {
        for(var i = 0; i < sCardSet.maxPanels; i++) { //Prüfen ob die Karte schon angezeigt wird
            if(msg["card"] == $(sCardSet.text + i).html()) { //Wenn schon vorhanden verändere Vote anzahl
                $(sCardSet.vote + i).html("Votes: " + msg["score"]); //Verändert die Votes der Karte
            }
        }
    },
    
    /* Beschreibung:
     * Speichert die neu gespielte Karte in ein Array überprüft dabei ob eine
     * Karte mit selbem Namen berreits im Array vorhanden ist
     *
     * Parameter:
     * msg: Die Nachricht mit der gespielten Karten von der socket schnittstelle
     */
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
    
    /* Beschreibung:
     * Speichert die gespielte Karte in ein Array.
     *
     * Parameter:
     * msg: Die Nachricht mit der allen gespielten Karten von der socket schnittstelle
     */
    saveCardSet: function (msg) {
        console.log("CardSet: saveCardSet");
        
        CardSet.cardHide();
        setOfCards = new Array();
        
        for(var name in msg["choices"] ) {
            console.log("CardSet: " + msg["choices"][name]);
            setOfCards.push(new CardSet.Card(name, msg["choices"][name]["score"]));
        }
    },
};