const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const apiKeyDarksky = 'c12e1a25cf36754a40885d37d3c85bc2';
  const weatherUrl = `https://api.darksky.net/forecast/${apiKeyDarksky}/${latitude},${longitude}`;
  request({url: weatherUrl, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services.')
    } else if (response.body.error) {
      callback('Unable to find location.')
    } else {
      const msg = `It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`
      callback(undefined, response.body.daily.data[0].summary + ' ' + msg)
    }
  })
}

module.exports = forecast