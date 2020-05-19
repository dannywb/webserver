console.log('JS file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  message1.textContent = 'Loading...'
  message2.textContent = ''

  const location = 'http://localhost:3000/weather?address=' + search.value
  
  fetch(location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = 'You fucked up! Address not found! Try again.'
        message2.textContent = ''
      } else {
        message1.textContent = data.location
        message2.textContent = data.forecast
      }  
    })
  })

})