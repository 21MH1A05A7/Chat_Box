// const socket=io("http://localhost:8000");
//
// broadcast is not required
// manually deselect thr CROS PORT
//
const socket = io('http://localhost:3000');

const form=document.getElementById('send-container');
const msg=document.getElementById('input_text');
const message_container=document.querySelector('.container');

// const user=prompt("Enter your name:");

// socket.on('connect',function(){
// console.log("connect");
// });

const append = function(name,message,position){
  // alert('called functionn');
  console.log(message);
  const messageElement=document.createElement('div');
  // let text = document.createElement("h5");
  // text.innerHTML = name;
  // messageElement.append(text);
  messageElement.innerHTML = '<h5>'+name+'</h5>';

  messageElement.innerHTML += '<h4>'+message+'</h4>';
  // messageElement.classList.add();
  messageElement.classList.add(position);
  // messageElement.classList.add('message_box');
  message_container.appendChild(messageElement);
}
// const extend = function(name,message,position){
//
//   const message_Element=document.createElement('div');
//   message_Element.innerHTML='<h5>'+name+'</h5>';
//   message_Element.innerHTML='<h4>'+message+"</h4>";
//   message_Element.classList.add(position);
//   message_Element.classList.add(message_box);
//   message_container.appendChild(message_Element);
// }
const name=prompt('Enter Your Name');


socket.emit('new-user-joined',name);

socket.on('user-joined',function(name){
  append(name,'joined the chat','right');
});



// when the send button gets clicked the function gets called and appends the message on the screen in certain format "messageElement"
form.addEventListener('submit',function(e){
  e.preventDefault();
  const message=msg.value;
  append('You',message,'right');
  socket.emit('send',message);
})


// all the users recieves the message from any of the user connected to the server
socket.on('recieve',function(data){
  makeSound();
  console.log(data.name);
  append(data.name,data.message,'left');
})


// socket gets called when a user leaves the chat i.e closes the TAB
socket.on('left-chat',function(name){
  append(name," left the Chat",'left');
})

//function that play sound when a user recieves a message from any user
function makeSound(){
  var t1=new Audio('ting.mp3');
  t1.play();
}




// socket.disconnect();
