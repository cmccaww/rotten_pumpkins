const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

 
const app = new express();

app.use(express.static('public'));

 
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


