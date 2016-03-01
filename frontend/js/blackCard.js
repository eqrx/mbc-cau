/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung;
 * Dieses Modul ist für die schwarze Karte zuständig. Funktionen sind das
 * ein- und ausblenden der karte so wie das Updaten des Text der Karte.
 *
 * Methoden:
 * init();
 * cardHide();
 * cardShow();
 * cardUpdate();
*/


var sBlackCard;  //Variabel für die Settings
   
var BlackCard = {        
    settings: {
        fadeTime: 1000, //Zeit die ein Fade benötigt

        panel: '#black-card-panel',
        text: '#black-card-text',
    },
    
    /* Beschreibung:
     * Versteckt die schwarze Karte
     */
    init: function() {
        sBlackCard = this.settings; //this auf die variable prägen
        
        BlackCard.cardHide();
    },
    
    //Verteckt alle Karten zu beginn
    cardHide: function () {
        $(sBlackCard.panel).hide();
        $(sBlackCard.text).html("");
    },
    
    //Blendet alle karten ein
    cardShow: function () {
        $(sBlackCard.panel).fadeIn(sBlackCard.fadeTime);
    },
    
    //Ändert denn Text auf einer Karte
    cardUpdate: function(card) {
        //Durch das aufrufen der Funktion wird Sichergestellt das der Inhalt duchgeführt wird bevor das fadeIn passiert
        $(sBlackCard.panel).fadeOut(sBlackCard.fadeTime, function () {
            $(sBlackCard.text).html(card); //Verändert denn Text der Karte
        }).fadeIn(sBlackCard.fadeTime);
    },
};