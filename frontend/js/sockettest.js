 var socket = io("http://141.22.27.231/");
      $('form').submit(function(){
        socket.emit('choice', JSON.parse($('#m').val()))
        $('#m').val('');
        return false;
      });
      socket.on('turn', function(msg){
        $('#messages').append($('<li>').text("New turn. Black card: " + msg["card"] + ", choices: " + JSON.stringify(msg["choices"], null, 4) + ", turnturation: " + msg["duration"]));
        socket.emit('request', {'id': 1})
      });
      socket.on('handout', function(msg){
        $('#messages').append($('<li>').text("Hand received: " + msg["hand"]));
      });
      socket.on('update', function(msg){
        $('#messages').append($('<li>').text("Player has chosen: " + msg["card"] + ", new score:  " + msg["score"] + ", chosen by: " + msg["player"]));
      });
      socket.on('names', function(msg){
        $('#messages').append($('<li>').text("Following score names are allowed: " + msg["names"]));
      });
      socket.on('illegal', function(msg){
        $('#messages').append($('<li>').text("Backend has detected an error"));
      });