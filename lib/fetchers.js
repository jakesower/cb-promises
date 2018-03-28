const fetch = require('./fetch');
const https = require('https');

const webRoot = 'https://7lvxk1opef.execute-api.us-east-1.amazonaws.com/dev';

function fetchWeather(location) {
  return fetch(`${webRoot}/weather?location=${location}`)
    .then(x => Number(JSON.parse(x).temperature));
}

function fetchTwins(city) {
  return fetch(`${webRoot}/twins?city=${city}`)
    .then(x => JSON.parse(x).twins);
}

module.exports = { fetchWeather, fetchTwins };
