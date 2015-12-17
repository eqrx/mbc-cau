function Card(name, votes) {
    this.name = name;
    this.votes = votes;
}

function Place(nextCard, nextPanel) {
    this.nextCard = nextCard;
    this.nextPanel = nextPanel;
}

var VOTE_MSG = '{"update":['+'{ "card":"Card 1","score":"10","name":"Name"}, ]}';