// security
const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

const adminOnglet = document.querySelector('.admin')
adminVerif = localStorage.getItem('isAdmin')

if(adminVerif === 1) {
  adminOnglet.style.display = 'flex'
} else {
  adminOnglet.style.display = 'none'
}

fetchEvent()

// nav

const pseudoNav = document.querySelector('.pseudo')
pseudoNav.innerHTML = localStorage.getItem('pseudo')

// fetch event

// const header = { headers: {
//   Authorization: 'Bearer ' + localStorage.getItem('token')}}

function fetchEvent() {
  const urlEvent = 'http://localhost:3000/api/evenements/'

  fetch(urlEvent)
    .then(function(res) {
      if(res.ok) {
        return res.json()
      }
    })
    .then(function(dataFromApi) {
      console.log('API', dataFromApi);
      loadEvent(dataFromApi);
    })
    .catch(console.log())
}

// function

function loadEvent(dataFromApi) {
  const eventContainer = document.querySelector('.event-container')
  console.log(eventContainer);

  for (let i = 0; i < dataFromApi.length; i++) {
    const eventDetails = document.createElement('div')
    eventDetails.className = 'event-container-details'
    eventContainer.appendChild(eventDetails)

    const div = document.createElement('div')
    eventDetails.appendChild(div)

    const eventName = document.createElement('p')
    eventName.className = 'eventName'
    eventName.innerHTML = dataFromApi[i].eventName
    div.appendChild(eventName)

    const participant = document.createElement('p')
    participant.className = 'participant'
    div.appendChild(participant)

    const div2 = document.createElement('div')
    eventDetails.appendChild(div2)

    const description = document.createElement('p')
    description.className = 'description'
    description.innerHTML = dataFromApi[i].eventDescription
    div2.appendChild(description)

    calculPlayer()

    function calculPlayer() {
      if (dataFromApi[i].eventParticipant == null) {
        participant.innerHTML = '0/' + dataFromApi[i].eventMaxParticipant
      } else {
        participant.innerHTML = JSON.parse(dataFromApi[i].eventParticipant).length + '/' + dataFromApi[i].eventMaxParticipant
      }
    }
  }
}
