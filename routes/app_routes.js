var express = require('express');
var router = express.Router();
const User = require('../models/user')


//GET /register
router.get('/register', function(req, res, next){
    return res.render('register', {title: 'sign up'});
});

//POST /register
router.post('/register', function(req, res, next){
    console.log('Witches Brew', req.body);
    const {email, name, favouriteHalloweenMovie, password, passwordConfirmation} = req.body
    
    if (email && name && favouriteHalloweenMovie && password && passwordConfirmation ) {
            console.log('inside if block')

            //confirm that user typed same password twice
            if (password !== passwordConfirmation){
                var err = new Error('Passwords do not match.');
                err.status = 400;
                return next(err)
            }
           
            //create object with form input
            var userData = {
                email: email,
                name: name,
                favouriteHalloweenMovie: favouriteHalloweenMovie,
                password: password
            };
           

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
        //   req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
   
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            // return next(err);
    }
});

module.exports = router;
