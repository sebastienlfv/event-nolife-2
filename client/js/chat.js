const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

const buttonDeco = document.querySelector('.deconnexion')
buttonDeco.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = '../client/connect.html'
})

var socket = io.connect('http://localhost:3000/')
const userId = localStorage.getItem('userId')

fetchUser()

const pseudoNav = document.querySelector('.pseudo')

const adminOnglet = document.querySelector('.admin')

function scrollToBottom() {
  const el = document.getElementById("msgContainer");
    el.scrollTop = el.scrollHeight;
}

function fetchUser() {
  fetch('http://localhost:3000/api/auth/' + localStorage.getItem('userId')) 
  .then(function(res) {
    if(res.ok) {
      return res.json()
    }
  })
  .then(function(dataUserFromApi) {
    console.log('user API', dataUserFromApi);
    pseudoNav.innerHTML = dataUserFromApi.pseudo

    if(dataUserFromApi.isAdmin == 1) {
      adminOnglet.style.display = 'flex'
    } else {
      adminOnglet.style.display = 'none'
    }

    var pseudo = dataUserFromApi.pseudo
    socket.emit('pseudo', pseudo)
    document.title = pseudo + ' - ' + document.title

    document.getElementById('chatForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const textInput = document.getElementById('msgInput').value
      document.getElementById('msgInput').value = '';

      if(textInput.length > 0) {
        socket.emit('newMessage', textInput)
        createElementFunction('newMessageMe', textInput)
        scrollToBottom()
        
      } else {
        return false
      }
    })

    // EVENTS

    socket.on('newUser', (pseudo) => {
      createElementFunction('newUser', pseudo)
      scrollToBottom()
    })

    socket.on('newMessageAll', (content) => {
      console.log(content);
      createElementFunction('newMessageAll', content)
      scrollToBottom()
    })

    socket.on('oldMessages', (messages) => {
      messages.forEach(message => {
        if(message.sender === pseudo) {
          createElementFunction('oldMessagesMe', message)
        } else {
          createElementFunction('oldMessages', message)
        }
      })
    })

    socket.on('writting', (pseudo) => {
      document.getElementById('isWritting').textContent = pseudo + ' est entrain d\'écrire'
    })

    socket.on('notWritting', () => {
      document.getElementById('isWritting').textContent = ''
    })

    socket.on('quitUser', (pseudo) => {
      createElementFunction('quitUser', pseudo)
      scrollToBottom()
    })

    // FUNCTIONS

    // function writting() {
    //   socket.emit('writting', pseudo)
    // }

    // function notWritting() {
    //   socket.emit('notWritting')
    // }

    function createElementFunction(element, content) {

      const newElement = document.createElement('div');

      switch(element) {
        
        case 'newUser':
          newElement.classList.add(element, 'message')
          newElement.textContent = content + ' a rejoint le chat'
          document.getElementById('msgContainer').appendChild(newElement)
          break;

        case 'newMessageMe':
          newElement.classList.add(element, 'message')
          newElement.innerHTML = pseudo + ' : ' + content
          document.getElementById('msgContainer').appendChild(newElement)
          break;

        case 'newMessageAll':
          newElement.classList.add(element, 'message')
          newElement.innerHTML = content.pseudo + ' : ' + content.message
          document.getElementById('msgContainer').appendChild(newElement)
          break;

        case 'oldMessages':
          newElement.classList.add(element, 'message')
          newElement.innerHTML = content.sender + ' : ' + content.content
          document.getElementById('msgContainer').appendChild(newElement)
          break;

        case 'oldMessagesMe': 
          newElement.classList.add('newMessageMe', 'message')
          newElement.innerHTML = content.sender + ' : ' + content.content
          document.getElementById('msgContainer').appendChild(newElement)
          break;

        case 'quitUser':
          newElement.classList.add(element, 'message')
          newElement.textContent = content + ' a quitté le chat'
          document.getElementById('msgContainer').appendChild(newElement)
          break;
  
      }

    }
  })
  .catch((err) => {
    console.log(err);
  })
}

