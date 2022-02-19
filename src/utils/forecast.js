const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2e312ec8cf6b19173549a779019877ee&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 
    //console.log('Forecast URL : ' + url)
    request({url, json:true}, (error,{ body }) => {
        if(error)
            callback('Unable to Connect to weather Service', undefined)
        else if(body.error)
            callback('Invalid Co-ordinates, Try Again', undefined)
        else
        {
            callback(undefined, 'Temperature : ' + body.current.temperature)
        }
    })
}

module.exports = forecast