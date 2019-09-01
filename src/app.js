const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abhishek'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About mee',
    name: 'Abhishek'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Will update soon',
    title: 'HELP',
    name: 'Abhishek'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must providean address'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Something wrong',
    title: '404',
    name: 'Abhishek'
  });
});

app.listen(3000, () => {
  console.log('server at 3000');
});
