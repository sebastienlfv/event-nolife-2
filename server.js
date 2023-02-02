const http = require('http');
const app = require('./app');
const dotenv = require('dotenv')
const server = http.createServer(app);
const mongoose = require('mongoose')
dotenv.config()

const ObjectId = mongoose.Types.ObjectId

mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://sebastienlfv:1712Sebout@cluster0.jbfv0rt.mongodb.net/ChatEvent', { useNewUrlParser: true, useUnifiedTopology: true }, 
function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Connexion à la BBD MONGODB');
  }
})

require('./models/chat-mongoose')
var Chat = mongoose.model('chats')
// const Chat = require('./models/chat')

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort( process.env.PORT );
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
})

var io = require('socket.io')(server)
io.on('connection', (socket) => {
  
  socket.on('pseudo', (pseudo) => {
    socket.pseudo = pseudo;
    socket.broadcast.emit('newUser', pseudo)

    Chat.find((err, messages) => {
      socket.emit('oldMessages', messages)
    })
  })

  socket.on('newMessage', (message) => {
    var chat = new Chat()
    chat.content = message
    chat.sender = socket.pseudo
    chat.save()

    console.log(chat.sender);

    socket.broadcast.emit('newMessageAll', { message: message, pseudo: socket.pseudo })
  })

  socket.on('writting', (pseudo) => {
    socket.broadcast.emit('writting', pseudo)
  })

  socket.on('notWritting', () => {
    socket.broadcast.emit('notWritting')
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('quitUser', socket.pseudo)
  })

})


server.listen(port);
