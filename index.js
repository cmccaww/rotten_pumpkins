
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const routes = require('./routes/app_routes.js');
const mongoose = require('mongoose');
const session = require('express-session')
mongoose.connect('mongodb://localhost/rotten-pumpkins', { useNewUrlParser: true });
const ReviewModel = require('./models/review')

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');



const methodOverride = require('method-override')
const app = new express();


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


// review section


// Index. Find method returns a Promise. A Promise is an object that represents represents a value that will be provided in the future. 
app.get('/reviews', (req, res) => {
  ReviewModel.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

//creating NEW reviews
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {title: "New Review"});
})

// CREATE
app.post('/reviews', (req, res) => {
  ReviewModel.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})


// SHOW
// TODO RENDERING IS NOT WORKING, NO FIELDS 
app.get('/reviews/:id', (req, res) => {
  ReviewModel.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})


// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  ReviewModel.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review, title: "Edit Review"});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  ReviewModel.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


//DELETE


app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  ReviewModel.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
