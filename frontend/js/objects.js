function Card(name, votes) {
    this.name = name;
    this.votes = votes;
}

function Place(nextCard, nextPanel) {
    this.nextCard = nextCard;
    this.nextPanel = nextPanel;
}

var blackCard;
var cardSet = new Array();
var voteCard = new Array();
var duration;
var next = new Place(0, 0);