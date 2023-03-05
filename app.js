
const express=require('express');

const path=require('path');
const http=require('http');
const app=express();

const server=app.listen(3000);

// mamually deactivating CROS
const io=require('socket.io')(server,{
  cors:{
    origin: '*',
  }
});
app.use(express.static(path.join(__dirname+'/public')));
// app.get("/",(_, res)=> res.send("HOME"));
// app.use(express.static('.'))

const users={};

io.on('connection',socket=>{
  socket.on('new-user-joined',function(name){
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
  });

  socket.on('send',function(message){
    socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
  });

  socket.on('disconnect',message=>{
    socket.broadcast.emit('left-chat',users[socket.id]);
    delete users[socket.id];
  })
});










// server.listen(3000,function(){
//   console.log("Server is running on port 3000");
// })



// io.listen(3000);
