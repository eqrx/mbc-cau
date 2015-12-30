$(function() {     
    var cards = new Array();
    var next = new Place(0, 0);
    
    cards.push(new Card("Dwayna", 10));
    cards.push(new Card("Balthazar", 9));
    cards.push(new Card("Melandru", 7));
    cards.push(new Card("Lyssa-LANGER SUPER TEXT ZUM TESTEN", 5));
    cards.push(new Card("Grenth", 3));
    cards.push(new Card("Kormir", 1));
    cards.push(new Card("Dwayna2", 10));
    cards.push(new Card("Balthazar2", 9));
    cards.push(new Card("Melandru2", 7));
    cards.push(new Card("Lyssa-LANGER SUPER TEXT ZUM TESTEN2", 5));
    cards.push(new Card("Grenth2", 3));
    cards.push(new Card("Kormir2", 1));
    cards.push(new Card("Dwayna3", 10));
    cards.push(new Card("Balthazar3", 9));
    cards.push(new Card("Melandru3", 7));
    cards.push(new Card("Lyssa-LANGER SUPER TEXT ZUM TESTEN3", 5));
    cards.push(new Card("Grenth3", 3));
    cards.push(new Card("Kormir3", 1));
    cards.push(new Card("Dwayna4", 10));
    cards.push(new Card("Balthazar4", 9));
    cards.push(new Card("Melandru4", 7));
    cards.push(new Card("Lyssa-LANGER SUPER TEXT ZUM TESTEN4", 5));
    cards.push(new Card("Grenth4", 3));
    cards.push(new Card("Kormir4", 1));
    
    CardSet.init();
    Highscore.init(cards, true);
    //Socket.init();
    
    var cardSetTimer = setInterval(function() {CardSet.cardUpdate(cards, next) }, CardSet.settings.updateTime);
});