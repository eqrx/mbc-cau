/* 
 * Author:  Mike Wüstenberg
 *
 * Beschreibung:
 * Globale datei zum starten der der init Methoden
*/

$(function() {    
    CardSet.init(true);
    WhiteCard.init();
    Highscore.init(true);
    BlackCard.init();
    ScoreName.init();
    Socket.init(true);   
      
});