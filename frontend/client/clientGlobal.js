/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung:
 * Globale datei zum starten der der init Methoden
*/

$(function() {    
    CardSet.init(true);
    WhiteCard.init();
    Highscore.init(false);
    BlackCard.init();
    ScoreName.init();
    Socket.init(true);   
      
});