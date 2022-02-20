
const weatherForm = document.querySelector('form')
const searchAddress = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    fetch('/weather?address=' + searchAddress.value).then((response) => {
    response.json().then(data => {
        //console.log(data)
        if(data.error)
            messageOne.textContent = data.error
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        //console.log(searchAddress.value)
        
    })
})
    
})
