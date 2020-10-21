// const express = require('express');
// const app = new express();

const Review = require('../models/review');

module.exports = function(app) {

app.get('/reviews', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

}


