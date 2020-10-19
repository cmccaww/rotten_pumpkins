const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
// const postRouter = require('./routes/posts_routes');
const pageRouter = require('./routes/page_routes');
const authRouter = require('./routes/auth_routes');
 
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

app.use("/", pageRouter)
// app.use('/posts', postRouter);
app.use("/user", authRouter)
