//Create event listener for keypress for new chats
var newChat = document.getElementById('chat')
newChat.addEventListener('keypress', newChatMessage);

function newChatMessage(event) {
  if (event.key === 'Enter') {
    sendChatMessage()
}
}
function sendChatMessage(){
  fetch('/chats', {
    body: JSON.stringify({
      message: newChat.value,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  // Pusher Setup
  var pusher = new Pusher('6e5f67bde794d28881ed', {
    encrypted: true
  })
  var pusherChannel = pusher.subscribe('chat_app')

  pusherChannel.bind('new_chat', function(chat) {
    addChatMessage(chat)
  })
}
function addChatMessage(chat){
  console.log(chat)
}
