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

fetchUser()

// nav

const pseudoNav = document.querySelector('.pseudo')
pseudoNav.innerHTML = localStorage.getItem('pseudo')

// fetch event

// const header = { headers: {
//   Authorization: 'Bearer ' + localStorage.getItem('token')}}

function fetchUser() {
  const userId = localStorage.getItem('userId')
  const urlUser = 'http://localhost:3000/api/auth/' + userId

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

  if(adminVerif == 1) {
    role.innerHTML = 'Rôle: Administrateur'
  } else {
    role.innerHTML = 'Rôle: Partenaire'
  }
}