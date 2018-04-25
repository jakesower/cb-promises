const fetch = require('./fetch');
const https = require('https');

const webRoot = 'https://l5q8d1uj4m.execute-api.us-east-1.amazonaws.com/dev';

function fetchWeather(location) {
  return fetch(`${webRoot}/weather?location=${location}`)
    .then(x => Number(JSON.parse(x).temperature));
}

function fetchTwins(city) {
  console.log(`${webRoot}/twins?city=${city}`)
  return fetch(`${webRoot}/twins?city=${city}`)
    .then(x => JSON.parse(x).twins);
}

const scientists = {
  Liskov: {
    name: 'Liskov',
    fullName: 'Barbara Liskov',
    dob: new Date('1939-11-07'),
    friend: 'Eich',
  },

  Eich: {
    name: 'Eich',
    fullName: 'Brenden Eich',
    dob: new Date('1961-07-04'),
    friend: 'Liskov',
  },

  Turing: {
    name: 'Turing',
    fullName: 'Alan Turing',
    dob: new Date('1912-06-23'),
    friend: null,
  }
}

function fetchScientist(name) {
  return scientists[name] ?
    Promise.resolve(scientists[name]) :
    Promise.reject('no such scientist');
}

module.exports = { fetchWeather, fetchTwins, fetchScientist };
