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
  window.location.href = './index.html'
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
      adminPanel(dataFromApi);
    })
    .catch(console.log())
}

// function

function adminPanel(dataFromApi) {

  const adminContainerEvent = document.querySelector('.admin-container-event')
  console.log('adminContainerEvent', adminContainerEvent);

  for (let i = 0; i < dataFromApi.length; i++) {
    const eventDetails = document.createElement('div')
    eventDetails.className = 'event-container-details'
    adminContainerEvent.appendChild(eventDetails)

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

    eventDetails.addEventListener('click', () => {
      adminContainerEvent.style.display = "none"

      document.title = 'NOLIFE - ' + dataFromApi[i].eventName
      const adminContainer = document.querySelector('.admin-container')
      const eventAdminContainer = document.createElement('div')
      eventAdminContainer.className = 'event-admin-container'
      const titleModify = document.createElement('div')
      const titleEvent = document.createElement('h1')
      const titleInput = document.createElement('input')
      const shortDescModify = document.createElement('div')
      const shortDescEvent = document.createElement('p')
      const shortDescArea = document.createElement('textarea')
      const longDescModify = document.createElement('div')
      const longDescEvent = document.createElement('p')
      const longDescArea = document.createElement('textarea')
      const eventParticipantModify = document.createElement('div')
      const eventParticipant = document.createElement('p')
      const eventParticipantUpdate = document.createElement('select')
      const optionParticipant = document.createElement('option')
      const optionParticipant1 = document.createElement('option')
      const optionParticipant2 = document.createElement('option')
      const optionParticipant3 = document.createElement('option')
      const optionParticipant4 = document.createElement('option')
      const optionParticipant5 = document.createElement('option')
      const optionParticipant6 = document.createElement('option')
      const optionParticipant7 = document.createElement('option')
      const optionParticipant8 = document.createElement('option')
      const optionParticipant9 = document.createElement('option')
      const optionParticipant10 = document.createElement('option')
      const modifyEventContainer = document.createElement('div')
      const modifyButton = document.createElement('button')
      const deleteButton = document.createElement('button')
      const cancelButton = document.createElement('button')
      adminContainer.appendChild(eventAdminContainer)
      eventAdminContainer.appendChild(titleModify)
      eventAdminContainer.appendChild(shortDescModify)
      eventAdminContainer.appendChild(longDescModify)
      eventAdminContainer.appendChild(eventParticipantModify)
      eventAdminContainer.appendChild(modifyEventContainer)
      titleModify.appendChild(titleEvent)
      titleModify.appendChild(titleInput)
      shortDescModify.appendChild(shortDescEvent)
      shortDescModify.appendChild(shortDescArea)
      longDescModify.appendChild(longDescEvent)
      longDescModify.appendChild(longDescArea)
      eventParticipantModify.appendChild(eventParticipant)
      eventParticipantModify.appendChild(eventParticipantUpdate)
      eventParticipantUpdate.appendChild(optionParticipant)
      eventParticipantUpdate.appendChild(optionParticipant1)
      eventParticipantUpdate.appendChild(optionParticipant2)
      eventParticipantUpdate.appendChild(optionParticipant3)
      eventParticipantUpdate.appendChild(optionParticipant4)
      eventParticipantUpdate.appendChild(optionParticipant5)
      eventParticipantUpdate.appendChild(optionParticipant6)
      eventParticipantUpdate.appendChild(optionParticipant7)
      eventParticipantUpdate.appendChild(optionParticipant8)
      eventParticipantUpdate.appendChild(optionParticipant9)
      eventParticipantUpdate.appendChild(optionParticipant10)
      modifyEventContainer.appendChild(modifyButton)
      modifyEventContainer.appendChild(deleteButton)
      modifyEventContainer.appendChild(cancelButton)
      titleModify.style.paddingTop = '20px'
      titleModify.style.display = 'flex'
      titleModify.style.alignItems = 'center'
      titleEvent.innerHTML = dataFromApi[i].eventName
      titleEvent.style.fontSize = '25px'
      titleEvent.style.color = '#fff'
      titleEvent.style.marginRight = '30px'
      shortDescModify.style.paddingTop = '20px'
      shortDescModify.style.display = 'flex'
      shortDescModify.style.alignItems = 'center'
      shortDescEvent.innerHTML = dataFromApi[i].eventDescription
      shortDescEvent.style.color = '#fff'
      shortDescEvent.style.marginRight = '30px'
      shortDescEvent.style.width = '250px'
      shortDescArea.style.width = '220px'
      shortDescArea.style.height = '50px'
      longDescModify.style.paddingTop = '20px'
      longDescModify.style.display = 'flex'
      longDescModify.style.alignItems = 'center'
      longDescEvent.innerHTML = dataFromApi[i].eventLongDescription
      longDescEvent.style.color = '#fff'
      longDescEvent.style.marginRight = '30px'
      longDescEvent.style.width = '300px'
      longDescArea.style.width = '320px'
      longDescArea.style.height = '150px'
      eventParticipantModify.style.paddingTop = '20px'
      eventParticipantModify.style.display = 'flex'
      eventParticipantModify.style.alignItems = 'center'
      eventParticipant.style.color = '#fff'
      eventParticipant.style.marginRight = '30px'
      optionParticipant.innerHTML = 'Nombre de participant'
      optionParticipant.disabled = true
      optionParticipant1.innerHTML = '1'
      optionParticipant1.value = '1'
      optionParticipant2.innerHTML = '2'
      optionParticipant2.value = '2'
      optionParticipant3.innerHTML = '3'
      optionParticipant3.value = '3'
      optionParticipant4.innerHTML = '4'
      optionParticipant4.value = '4'
      optionParticipant5.innerHTML = '5'
      optionParticipant5.value = '5'
      optionParticipant6.innerHTML = '6'
      optionParticipant6.value = '6'
      optionParticipant7.innerHTML = '7'
      optionParticipant7.value = '7'
      optionParticipant8.innerHTML = '8'
      optionParticipant8.value = '8'
      optionParticipant9.innerHTML = '9'
      optionParticipant9.value = '9'
      optionParticipant10.innerHTML = '10'
      optionParticipant10.value = '10'
      modifyEventContainer.style.marginTop = '50px'
      modifyEventContainer.style.display = 'flex'
      modifyEventContainer.style.justifyContent = 'center'
      modifyButton.innerHTML = 'Modifier'
      modifyButton.style.marginRight = '10px'
      modifyButton.style.padding = '10px'
      deleteButton.innerHTML = 'Supprimer'
      deleteButton.style.marginLeft = '10px'
      deleteButton.style.padding = '10px'
      cancelButton.innerHTML = 'Annuler'
      cancelButton.style.marginLeft = '10px'
      cancelButton.style.padding = '10px'

      cancelButton.addEventListener('click', () => {
        window.location.href = './admin.html'
      })

      modifyButton.addEventListener('click', () => {
        const urlModify = 'http://localhost:3000/api/evenements' + '/' + dataFromApi[i].id
        const titleValue = titleInput.value
        const shortDescValue = shortDescArea.value
        const longDescValue = longDescArea.value
        const participantValue = eventParticipantUpdate.value
  
        const payload = {
          eventName: titleValue,
          eventDescription: shortDescValue,
          eventLongDescription: longDescValue,
          eventMaxParticipant: participantValue
        }
  
        const header = { headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }}
  
        axios.put(urlModify, payload, header)
          .then(() => {
            window.location.href = './admin.html'
          })
          .catch((error) => {
            console.log(error);
          })
      })

      deleteButton.addEventListener('click', () => {
        const urlDelete = 'http://localhost:3000/api/evenements' + '/' + dataFromApi[i].id
        const header = { headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')}}
        
        axios.delete(urlDelete, header)
          .then(() => {
            window.location.href = './admin.html'
          })
          .catch((error) => {
            console.log(error);
          })
      })
    })
  }
}
