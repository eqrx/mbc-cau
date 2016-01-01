function Card(name, votes) {
    this.name = name;
    this.votes = votes;
}

function Place(nextCard, nextPanel) {
    this.nextCard = nextCard;
    this.nextPanel = nextPanel;
}

var next = new Place(0, 0);