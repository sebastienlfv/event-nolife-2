const URL = 'http://localhost:'
const PORT = 3000

// security
const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

const buttonDeco = document.querySelector('.deconnexion')
buttonDeco.addEventListener('click', () => {
  localStorage.clear()
  window.location.href = '../client/connect.html'
})

const adminOnglet = document.querySelector('.admin')

// fecth

fetch(URL + PORT + '/api/auth/' + localStorage.getItem('userId')) 
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
  })
  .catch((err) => {
    console.log(err);
  })

const pseudoNav = document.querySelector('.pseudo')


const addButton = document.querySelector('.addButton')
const cancelButton = document.querySelector('.cancelEvent')

const titleInput = document.querySelector('.titleInput')
const shortDescArea = document.querySelector('.shortDescArea')
const longDescArea = document.querySelector('.longDescArea')
const eventParticipantUpdate = document.querySelector('.eventPartcipantUpdate')

cancelButton.addEventListener('click', () => {
  window.location.href = './admin.html'
})

addButton.addEventListener('click', () => {
  const urlEvent = URL + PORT + '/api/evenements'
  const titleValue = titleInput.value
  const shortDescValue = shortDescArea.value
  const longDescValue = longDescArea.value
  const participantValue = eventParticipantUpdate.value

  const header = { headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }}

  const payload = {
    eventName: titleValue,
    eventDescription: shortDescValue,
    eventLongDescription: longDescValue,
    eventMaxParticipant: participantValue
  }

  axios.post(urlEvent, payload, header)
  .then(() => {
    window.location.href = './admin.html'
  })
  .catch((error) => {
    console.log(error);
  })
})