const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const routes = require('./routes/app_routes.js');
const mongoose = require('mongoose')
const session = require('express-session')

 
const app = new express();

app.use(express.static('public'));
app.use(express.urlencoded())

// use sessions for tracking logins
app.use(session({
    secret: 'Happy Halloween',
    resave: true,
    saveUninitialized: false
}));

 // include routes
app.use('/', routes);

//mongoose connect
mongoose.connect("mongodb://localhost:27017/rotten_pumpkins");
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/search', function (req, res) {
    res.render('search');
});
 
app.listen(3000, () => {
    console.log('App listening on port 3000')
});