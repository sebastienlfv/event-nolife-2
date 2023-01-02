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
    })
    .catch(console.log())
}