//Step 1: Create script to select messages input field
var selectChatMessage = document.getElementById('inputChat');

//Step 1a: Declare other global variables
var chatEndPoint = '/chats'

//Step 2: Create Event listener for the keypress of 'Enter' and create function that waits for Enter key to fire off AJAX POST
selectChatMessage.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
    console.log('Kick off Ajax Post')
        chatAjaxPost()
    }
})
// NOTE: Ask Collin why need to use anonymous function...

//Step 3: Create function to POST Javascript Object converted to text to Server
function chatAjaxPost(event){
    //Wait for keypress of Enter to fire POST
    console.log('Preparing the chat Request POST')
    fetch(chatEndPoint, {
        body: JSON.stringify({
            message: selectChatMessage.value,
        }),
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    console.log('Sending the chat request POST')
}

//Step 4: Pusher Setup -> From Instructor
var pusher = new Pusher('6e5f67bde794d28881ed', {
    encrypted: true
})

var pusherChannel = pusher.subscribe('chat_app')

pusherChannel.bind('new_chat', function(chat) {
    addGlobalChatMessages(chat)
})
// Step 5: Create function to pull in Global Chats
function addGlobalChatMessages(chat){
    console.log(chat.message)
    //Creates the list element for the global chats
    var li = document.createElement('li')
    //Add Bootstrap styling for the global chat element
    li.classList.add('list-group-item')
    //Insert Global chat message into element
    li.innerHTML = chat.message
    //Access 'messages' area on page and insert new chats
    var messages = document.querySelector('#messages')
    messages.insertBefore(li, document.querySelector('li'))
}
