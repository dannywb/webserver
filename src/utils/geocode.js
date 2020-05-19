const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGFubnl3YiIsImEiOiJjanRnNHFxMGcwZ2kzNDNwZDJzYzhpZmowIn0.9IKcxvs_HJMxTrb2g85BxQ`

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to location services.')
    } else if (response.body.message === 'Not Found' || response.body.features.length === 0) {
      callback('Unable to find address.')
    } else {
      callback(undefined, {
        lng: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode