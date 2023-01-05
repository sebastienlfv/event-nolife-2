// security
const token = localStorage.getItem('token')
if(token === null) {
  window.location.href = '../client/connect.html'
}

const adminOnglet = document.querySelector('.admin')
const adminVerif = localStorage.getItem('isAdmin')
console.log(adminVerif);

if(adminVerif == 1) {
  adminOnglet.style.display = 'flex'
} else {
  adminOnglet.style.display = 'none'
}

fetchEvent()

// nav

fetch('http://localhost:3000/api/auth/' + localStorage.getItem('userId')) 
  .then(function(res) {
    if(res.ok) {
      return res.json()
    }
  })
  .then(function(dataUserFromApi) {
    console.log('user API', dataUserFromApi);
    pseudoNav.innerHTML = dataUserFromApi.pseudo
  })
  .catch((err) => {
    console.log(err);
  })

const pseudoNav = document.querySelector('.pseudo')

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
      console.log('API event', dataFromApi);
      loadEvent(dataFromApi);
    })
    .catch(console.log())
}

// function

function loadEvent(dataFromApi) {
  const eventContainer = document.querySelector('.event-container')
  const eventContainerDetails = document.querySelector('.event-details')
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
      if (dataFromApi[i].eventParticipant == '[]' || null) {
        participant.innerHTML = '0/' + dataFromApi[i].eventMaxParticipant
      } else {
        participant.innerHTML = JSON.parse(dataFromApi[i].eventParticipant).length + '/' + dataFromApi[i].eventMaxParticipant
      }
    }

    eventDetails.addEventListener('click', () => {
      eventContainer.style.display = 'none'
      eventContainerDetails.style.display = 'block'

      const eventName = document.querySelector('.eventNameDetails')
      const eventLongDescription = document.querySelector('.eventLongDescriptionDetails')
      const nbParticipant = document.querySelector('.nombreDeParticipantDetails')
      const participantMax = document.querySelector('.participantMaxDetails')
      const joinEvent = document.querySelector('.joinEvent')
      const eventFull = document.querySelector('.eventFull')
      const leaveEvent = document.querySelector('.leaveEvent')
      const userId = localStorage.getItem('userId')

      eventName.innerHTML = dataFromApi[i].eventName
      eventLongDescription.innerHTML = dataFromApi[i].eventLongDescription
      participantMax.innerHTML = 'Participant max: ' + dataFromApi[i].eventMaxParticipant

      if (dataFromApi[i].eventParticipant == '[]' || null) {
        nbParticipant.innerHTML = 'Nombre de participant: 0/' + dataFromApi[i].eventMaxParticipant
      } else {
        nbParticipant.innerHTML = 'Nombre de participant: ' + JSON.parse(dataFromApi[i].eventParticipant).length+ '/' + dataFromApi[i].eventMaxParticipant
      }

      if (JSON.parse(dataFromApi[i].eventParticipant).length == dataFromApi[i].eventMaxParticipant) {
        joinEvent.style.display = 'none'
        eventFull.style.display = 'flex'
        console.log('eventFull',(JSON.parse(dataFromApi[i].eventParticipant).length == dataFromApi[i].eventMaxParticipant));
      }

      if (JSON.parse(dataFromApi[i].eventParticipant.includes(userId))) {
        joinEvent.style.display = 'none'
        eventFull.style.display = 'none'
        leaveEvent.style.display = 'flex'
        console.log("inEvent", JSON.parse(dataFromApi[i].eventParticipant.includes(userId)));
      }

      joinEvent.addEventListener('click', (action) => {
        const userId = localStorage.getItem('userId')
        const eventId = dataFromApi[i].id
        const payload = {
          userId: userId,
          isJoinOrLeave: action
        }
        const urlEvent = 'http://localhost:3000/api/evenements/' + eventId + '/joinEvent'
        const header = { headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')}}


        axios.post(urlEvent, payload, header)
          .then(() => {
            calculPlayer()
            window.location.href = '../index.html'
          })
          .catch((err) => {
            console.log(err)
          })
      })

      leaveEvent.addEventListener('click', () => {
        const userId = localStorage.getItem('userId')
        const eventId = dataFromApi[i].id
        const payload = {
          userId: userId
        }

        const urlEventLeave = 'http://localhost:3000/api/evenements/' + eventId + '/leaveEvent'
        const header = { headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')}}

        axios.post(urlEventLeave, payload, header)
          .then(() => {
            calculPlayer()
            window.location.href = '../index.html'
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  }
}
