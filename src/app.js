const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { send } = require("process");

const geocode = require("./utils/geocode");
const weather = require("./utils/forcast");
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

/*
default folder for view is "views" this code to change the default path 
 */
const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//Setup handlebars engine
app.set("view engine", "hbs" /* handel bars*/);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Khalid",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "this is title ",
    name: "taha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "khalid",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send("Please provide address");
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        weather(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            location,
            forecastData,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help artical not found",
    name: "khalid",
    title: "404",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "This page not found",
    name: "khalid",
    title: "404",
  });
});

//Start the server type once
app.listen(/*Port*/ port, () => {
  console.log("Server is up on port " + port);
});
