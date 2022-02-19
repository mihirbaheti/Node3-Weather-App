const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWJhaGV0aSIsImEiOiJja3l1NGJlbHUwZGVzMm5yendvcGoxaDM2In0.M5xfPaE7r7cnpMO9luG-_A'
    //console.log("Geocode URL : " + url)
    request({url, json:true}, (error,{body}) => {
        if(error)
            callback('Unable to Connect to Location Service', undefined)
        else if(body.features.length == 0)
            callback('Invalid Location, Try Again', undefined)
        else
        {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode