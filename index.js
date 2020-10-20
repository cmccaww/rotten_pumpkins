
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const routes = require('./routes/app_routes.js');
const reviews = require('./controllers/reviews')(app);
const mongoose = require('mongoose');
const session = require('express-session')
mongoose.connect('mongodb://localhost/rotten-pumpkins', { useNewUrlParser: true });
// const Review = require('./models/review')


// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');



const methodOverride = require('method-override')
const app = new express();

app.use(methodOverride('_method'))


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

// app.use(methodOverride('_method'))
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/search', function (req, res) {
    res.render('search');
});
 
app.listen(3000, (err) => {
    if (err) {
        console.log("There was a problem", err)
        return;
    }
    console.log('App listening on port 3000')
});


