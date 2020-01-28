const express = require('express');
const hbs = require("hbs");//handlebars
const works = require('./serverWorks.js');
const fs = require('fs');
//
const app = express();


//
app.set('view engine', 'hbs'); 

//MIDDLEWares
app.use((req, res, next) => {
  var now = new Date().toString();
  var logInfo = `requestDate: ${now}-- methodUsed: ${req.method} -- visitedURL: ${req.url}`;

  fs.appendFile('server.log', logInfo + '\n', (err) => {
    if(err){
      console.log('unable to append log file to server.log');
    }

  });
  next();
});
//
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

//REGISTERING partials
hbs.registerPartials(__dirname + '/views/partials');

/*//use this letter in the code to register function to be run hbs
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
*/
//


app.get('/', (req, res) => {
  res.render('home.hbs', works.mustacheTemp);
});

app.get('/about', (req, res) => {
  res.render('about.hbs', works.mustacheTemp);
});

app.listen(3000);
