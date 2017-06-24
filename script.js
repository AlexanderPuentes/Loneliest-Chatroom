main = function(){
  addBySend();
  addByEnter();
  imLonely();
  deleteMessage();
}

addBySend = function() {
  var button = $("#new-message-button");
  button.click(function() {
    addToConversation();
  });
}

addByEnter = function() {
  $("#new-message-body").keypress(function(evt){
    if(evt.which === 13){
      evt.preventDefault();
      addToConversation();
    }
  });
}

deleteMessage = function() {
  $('#conversation').on('click','.delete',function(evt) {
    evt.preventDefault();
    $(this).parent().remove();
  });
}

getTime = function() {
  var time = new Date();
  return time.getHours()+":"+time.getMinutes();
}

var turn = 0;
userName = function() {
  var people = ["Me", "Myself", "I"];
  return people[turn++%3];
}

message = function(msg, chuck) {
  // var name = chuck != undefined ? chuck : userName(); // same as below
  var name;
  if (chuck != undefined) {
    name = chuck;
  }
  else {
    name = userName();
  }
  $('#conversation').append('<li class="message"> <a class="delete" href="#"> Delete </a> <h3 class="author">'+name+'</h3> <p class="message-body">'+msg+'</p><span class="timestamp">'+getTime()+'</span> </li>');
};

addToConversation = function() {
  var msg = $('#new-message-body').val();
  $('#new-message-body').val("");
  message(msg);
}

imLonely = function() {
  $("#lonely").click(function() {
    chuckAjax();
  });
}

chuckAjax = function() {
  $.ajax({
    url:'http://api.icndb.com/jokes/random',
    success: function(data) {
      var joke = data.value.joke;
      message(joke, "Internet")
    }
  });
}

$(document).on('ready load', main);
