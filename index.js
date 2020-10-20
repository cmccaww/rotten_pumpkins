
const express = require('express');

const exphbs  = require('express-handlebars');
const path = require('path');
const routes = require('./routes/app_routes.js');
const mongoose = require('mongoose');
const session = require('express-session')
mongoose.connect('mongodb://localhost/rotten-pumpkins', { useNewUrlParser: true });

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// const mongoStorage = process.env.VAR_MONGO
// const postRouter = require('./routes/posts_routes');

// const pageRouter = require('./routes/page_routes');
// const authRouter = require('./routes/auth_routes');

const methodOverride = require('method-override')

//later will go to models/review.js
const app = new express();

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

app.use(express.static('public'));

app.use(methodOverride('_method'))
 
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

app.use("/", pageRouter)
// app.use('/posts', postRouter);
app.use("/user", authRouter)

// // adding the API
// const result = document.querySelector(".result");
// const omdbApi = axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=7a589534", {
//     params: {
//         api_key: "7a589534"
//         t: 
//     }
// })

// review section

// Index. Find method returns a Promise. A Promise is an object that represents represents a value that will be provided in the future. 
app.get('/reviews', (req, res) => {
  Review.find()
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
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})


// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})


// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review, title: "Edit Review"});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


//DELETE
const reviews = require('./controllers/reviews')(app, Review);
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
