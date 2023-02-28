const socket = io('http://localhost:2020')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.querySelector(".card-body");

//<<<----- For Plying audio ----->>>
var audio = new Audio('ting.mp3');

const append = (message,position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message'); // msg add to that class
    messageElement.classList.add(position); // set msg position left or right
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

//server ne data send kare che

const name = prompt('enter your name to join'); //uuu
socket.emit('new-user-joined', name);

//server side thi data le che
socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send-msg', message);
    messageInput.value = ''
})

//
socket.on('receive', data => {
    append(`${data.name} : ${data.message} `,'left')
})

socket.on('left', data => {
    append(`${data} left the chat `,'left')
})
