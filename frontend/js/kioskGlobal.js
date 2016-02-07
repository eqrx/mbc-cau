/*
 * Author:  Mike Wüstenberg
 *
 * Beschreibung:
 * Globale datei zum starten der der init Methoden
 */

$(function() {         
    CardSet.init(true);
    Highscore.init(true);
    BlackCard.init();
    Socket.init(false);
});