const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//set path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Mihir Baheti'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About us',
        name : 'Mihir Baheti'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Mihir Baheti',
        helptext : 'some helpful text'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'Error Page',
        name : 'Mihir Baheti',
        errortext : 'help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title : 'Error Page',
        name : 'Mihir Baheti',
        errortext : 'Sorry! Page Not Found'
    })
})

app.listen(3000, () => {
    console.log("starting the web server..")
})