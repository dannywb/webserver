const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Danny Brown'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Charlie',
    name: 'Danny Brown'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Danny Brown',
    message: 'This is a help message to help you'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided for search'
    })
  }

  geocode(req.query.address, (error, geodata) => {
    if (error) {
      return res.send({error})
    }
  
    forecast(geodata.lng, geodata.lat, (error, data) => {
      if (error) {
        return res.send(error)
      }
      res.send({
        location: geodata.location,
        forecast: data,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '',
    name: 'Danny Brown',
    message: 'The help article you are looking for does not exist.'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    message: 'The page cannot be found'
  } )
})

app.listen(3000, () => {
  console.log('The server is running on port 3000.')
})