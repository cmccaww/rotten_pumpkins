const express = require('express');
const exphbs  = require('express-handlebars');
 
const app = new express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
 
app.listen(3000, () => {
    console.log('App listening on port 3000')
});