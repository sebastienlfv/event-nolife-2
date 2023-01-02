// selector

const submitLogin = document.querySelector('.login-submit')


// function

function login() {
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  const xhttp = new XMLHttpRequest()
  xhttp.open('POST', 'http://localhost:3000/api/auth/login')
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhttp.send(JSON.stringify({
    'email': email,
    'password': password
  }))
  xhttp.onreadystatechange = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText)
      console.log(response)
      localStorage.setItem('email', response.email)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      localStorage.setItem('pseudo', response.pseudo)
      localStorage.setItem('isAdmin', response.isAdmin)
      window.location.href = '../../index.html'
    } else if (this.status === 404) {
      statusLogin.innerHTML = 'Compte introuvable !'
      statusLogin.style.color = 'red'
      statusLogin.style.marginTop = '10px'
    } else if (this.status === 403) {
      statusLogin.innerHTML = 'Mot de passe incorrect !'
      statusLogin.style.color = 'orange'
      statusLogin.style.marginTop = '10px'
    }
  }
  return false
}