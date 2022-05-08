const request = require("request");

const weather = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=20c858bec43730020ca2bdc92ed2060f&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        " The temperature in " +
          body.location.name +
          " " +
          body.current.temperature +
          " Degree and it feel like " +
          body.current.feelslike +
          " Degree"
      );
    }
  });
};
module.exports = weather;
