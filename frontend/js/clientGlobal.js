$(function() {
    var blackCard;
    var cardSet = new Array();
	var voteCard = new Array();
    var duration;
    var next = new Place(0, 0);
	
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
    cards.push(new Card("Kormir2", 1));
	
	voteCard.push(cards[0].name);
	voteCard.push(cards[5].name);
	voteCard.push(cards[2].name);
	voteCard.push(cards[3].name);*/
    
	//alert(voteCard[0]);

    Socket.init();
    CardSet.init();
    WhiteCard.init();
    Highscore.init(cardSet);

	//WhiteCard.cardUpdate(voteCard);
    //WhiteCard.cardShow();
    
    //Socket.bindVoteButtons();
    
    var cardSetTimer = setInterval(function() {CardSet.cardUpdate(cardSet, next) }, CardSet.settings.updateTime);    
});