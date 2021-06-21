//Make connection
const socket = io.connect('http://localhost:4000'); 

//Query Dom
let message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    btn = document.querySelector('#send'),
    output = document.querySelector('#output'),
    feedback = document.querySelector('#feedback');


//Emit events
btn.addEventListener('click', ()=> {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', ()=> {
    socket.emit('typing', handle.value);
})

//Listen to events
socket.on('chat', (data)=> {
    output.innerHTML += '<p><strong>'+data.handle+':</strong>&nbsp;'+ data.message + '</p>';
});

socket.on('typing', (data)=> {
    feedback.innerHTML ='<p><em>' +data+ ' is typing a message....</em></p>';
});