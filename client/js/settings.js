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
fetch( URL + PORT + '/api/auth/' + localStorage.getItem('userId')) 
  .then(function(res) {
    if(res.ok) {
      return res.json()
    }
  })
  .then(function(dataUserFromApi) {
    console.log('user API', dataUserFromApi);
    pseudoNav.innerHTML = dataUserFromApi.pseudo

    console.log(dataUserFromApi.isAdmin == 1);

    if(dataUserFromApi.isAdmin == 1) {
      adminOnglet.style.display = 'flex'
    } else {
      adminOnglet.style.display = 'none'
    }
  })
  .catch((err) => {
    console.log(err);
  })

fetchUser()

// nav

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

// fetch event

// const header = { headers: {
//   Authorization: 'Bearer ' + localStorage.getItem('token')}}

function fetchUser() {
  const userId = localStorage.getItem('userId')
  const urlUser = URL + PORT + '/api/auth/' + userId

  fetch(urlUser)
    .then(function(res) {
      if(res.ok) {
        return res.json()
      }
    })
    .then(function(dataFromApi) {
      console.log('API', dataFromApi);
      displayUser(dataFromApi)
    })
    .catch(console.log())
}

function displayUser(dataFromApi) {
  const pseudo = document.querySelector('.pseudoSetting')
  const firstname = document.querySelector('.firstname')
  const lastname = document.querySelector('.lastname')
  const email = document.querySelector('.email')
  const role = document.querySelector('.role')
  
  pseudo.innerHTML = dataFromApi.pseudo
  firstname.innerHTML = 'Prenom: ' + dataFromApi.firstname
  lastname.innerHTML = 'Nom: ' + dataFromApi.lastname
  email.innerHTML = 'Email: ' + dataFromApi.email

  if(dataFromApi.isAdmin == 1) {
    role.innerHTML = 'Rôle: Administrateur'
  } else {
    role.innerHTML = 'Rôle: Partenaire'
  }
}

const goToValidate = document.querySelector('.goToValidate')
const goToCancel = document.querySelector('.goToCancel')

goToValidate.addEventListener('click', () => {
  document.querySelector('.confirm-modify-settings').style.display = 'flex'
})

const modifyInformationDetails = document.querySelector('.modifySettings')
const containerModifyInfo = document.querySelector('.setting-container-modify')
const containerInfo = document.querySelector('.setting-container')

modifyInformationDetails.addEventListener('click', () => {
  containerInfo.style.display = 'none'
  containerModifyInfo.style.display = 'flex'
})


const cancelButton = document.querySelector('.CancelButton')

cancelButton.addEventListener('click', () => {
  containerInfo.style.display = 'flex'
  containerModifyInfo.style.display = 'none'
  document.querySelector('.confirm-modify-settings').style.display = 'none'
  document.querySelector('.error-confirm').innerHTML = ''
})

const modifySettings = document.querySelector('.ValidateSettings')
const pseudoInput = document.querySelector('.input-pseudo')
const emailInput = document.querySelector('.input-email')
const prenomInput = document.querySelector('.input-prenom')
const nomInput = document.querySelector('.input-nom')

modifySettings.addEventListener('click', () => {
  const userId = localStorage.getItem('userId')
  const urlSettings = URL + PORT + '/api/auth/' + userId
  const errorConfirm = document.querySelector('.error-confirm')
  
  const payload = {
    pseudo: pseudoInput.value,
    email: emailInput.value,
    firstname: prenomInput.value,
    lastname: nomInput.value
  }

  console.log('payload', payload);

  const header = { headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }}

  axios.put(urlSettings, payload, header)
    .then(() => {
      errorConfirm.innerHTML = 'Informations Modifiés !'
      errorConfirm.style.color = 'green'
      setTimeout(() => {
        window.location.href = './reglages.html'
      }, 1000)
    })
    .catch((err) => {
      errorConfirm.innerHTML = 'Une erreur est survenue !'
      errorConfirm.style.color = 'red'
      console.log(err);
    })
})

const changePassword = document.querySelector('.changePassword')
const containerPassword = document.querySelector('.changePasswordContainer')
const cancelChangePw = document.querySelector('.cancelChangePw')

changePassword.addEventListener('click', () => {
  containerPassword.style.display = 'flex'
})

cancelChangePw.addEventListener('click', () => {
  containerPassword.style.display = 'none'
})