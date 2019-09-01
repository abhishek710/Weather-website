const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/8efd57fa57e96af0d21d017ce35fa3f0/' +
    latitude +
    ',' +
    longitude +
    '?units=si';
  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather API', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
        body.currently.temperature +
          ' degress out. There is a ' +
        body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
