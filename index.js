const express = require('express');
const fetch = require("node-fetch");
const cors = require('cors');
const path = require('path');
var request = require('request');
var http = require('http');

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const api = {
	key: "256b4436937b86e2a5e65098485f51fe",
	url: "https://api.openweathermap.org/data/2.5/",
}


const port = process.env.PORT || 8080;
var chi_url = api.url+'weather?q=Chicago&units=imperial&appid='+api.key;
var fm_url = api.url+'weather?q=Fort Myers&units=imperial&appid='+api.key;
var sf_url = api.url+'weather?q=Sioux Falls&units=imperial&appid='+api.key;

app.get('/', (req, res) => {
  res.send('Hey. Go to /api/chicago, /api/fort-myers, or /api/sioux-falls for data');
});

app.get('/api/chicago', async (req, res) => {
    await fetch(chi_url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.send(err));	
});

app.get('/api/fort-myers', async (req, res) => {
    await fetch(fm_url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.send(err));	
});

app.get('/api/sioux-falls', async (req, res) => {
    await fetch(sf_url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.send(err));	
});

app.get('*', (req, res) =>{
    res.redirect('/');
});
app.listen(port, () => console.log("Served at the port "+port));
