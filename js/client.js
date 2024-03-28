const socket= io('http://localhost:8000')
const form = document.getElementById('send-form');              
const messageInput = document.getElementById('messageInp');         
const messageContainer = document.querySelector(".container");      

var audio = new Audio('tone.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;                         
    messageElement.classList.add('message')
    messageElement.classList.add(position) 
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

 const names = prompt("Enter your name to join");
 socket.emit('new-user-joined', names);

 socket.on('user-joined', names =>{
    append(`${names} joined the chat`, 'right')
 })

 socket.on('receive', data =>{
    append(`${data.names}: ${data.message}`,'left')
 });

 socket.on('left', name =>{
    append(`${names} left the chat`, 'right');
 });

 form.addEventListener('submit', (e)=>{            
    e.preventDefault();                    
    const message = messageInput.value;
    append(`You: ${message}`,'right');          
    socket.emit('send', message);                
    messageInput.value = '' 
})