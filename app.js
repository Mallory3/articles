const dotenv = require('dotenv');
//envoke dotenv
dotenv.config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


//boot express
const app = express();

app.get('/', (req, res) => res.render('index'))

//brings in route to connect article fixtures to mongodb
app.use('/', require('./routes/articles'));



//EJS
app.set('view engine','ejs');
//include if accepting post data in your app
app.use(express.urlencoded({extended: true}));


// static assets
app.use(express.static(path.join(__dirname, 'assets')));

//catch all 404 errors (works!)
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});


//create a port to run app on
const PORT = process.env.PORT || 8080;

//create a server and bring in the port
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});