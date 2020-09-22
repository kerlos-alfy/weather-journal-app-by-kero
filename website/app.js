/* Global Variables */
const appid = 'f3cdc176f88734ddf97419f7921047c5' /* I git it from openweathermap.org  */
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const zipInput = document.getElementById('zipcode'); /* To take Zip Code  */
const userInput = document.getElementById('feelings') /* To take Feeling  */
const dateHolder = document.getElementById('date') /* Date  */
const tempHolder = document.getElementById('temp') /* Showe temp  */
const contentHolder = document.getElementById('content') /* Showefeeling  */
const postURL = 'http://localhost:3000'
const getURL = 'http://localhost:3000/all'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// A function to call fetch on OpenWeatherMap 
const getWeather = async(baseURL, zip = '94040,us', api) => {
    const url = `http://${baseURL}zip=${zip}&appid=${api}`
    const response = await fetch(url)
    let jsonResponse = await response.json()
    return jsonResponse
}

//A function to post data with user input
const postData = async(path, data = {}) => {
    const response = await fetch(path, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
}

// A funtion to update UI
const updUI = async() => {
    const response = await fetch(getURL)
    const jsonRespon = await response.json()
    dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonRespon.date}`
    contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonRespon.userResponse}`
    tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonRespon.temperature}`
}

// The handleClick event handler
const handleClick = async() => {
    const weatherData = await getWeather(baseURL, zipInput.value, appid)
    const data = {
        temperature: weatherData.main.temp,
        date: newDate,
        userresponse: userInput.value
    }
    await postData(postURL, data)
    updUI()
}

//Add event listener for the element with the id of 'generate'
const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)
    //Good in Test