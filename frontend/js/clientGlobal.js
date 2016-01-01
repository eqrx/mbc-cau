$(function() {

	
    /*cards.push(new Card("Dwayna", 10));
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
    cards.push(new Card("Kormir2", 1));*/
    
    CardSet.init(true);
    WhiteCard.init();
    Highscore.init(cardSet);
    ScoreName.init();
    Socket.init();
    
      
});