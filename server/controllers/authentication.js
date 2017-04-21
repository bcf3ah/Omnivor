//all logic for auth requests goes here! We'll authenticate users upon signup here.
import User from '../models/user';//import User class
import config from '../config';
import jwt from 'jwt-simple';
import passport from 'passport';

//create function that will take user's id and encode it with our secret key to create a jwt on signup and login
function userJWT(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);//first arg is info we want to encode, 2nd arg is how we want to encrypt it (ie with our secret key). {sub: user.id, iat: timestamp} is a convention for issuing web tokens. Sub is subject sub field of the token, iat is issued at time
}


//create a helper function to handle sign ins and to give the users tokens upon signing in
exports.signin = function(req, res, next){
  //User is authorized, just need to give them a token now. Remember, once user is authorized, Passport assigns them to req.user!
  res.send({
    token: userJWT(req.user),
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    id: req.user.id
  });
}


//create a helper function to handle signups
exports.signup = function(req, res, next){
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  //make sure email, names, and password are filled out
  if(!email || !password || !firstName || !lastName){
    return res.status(422).send({error: 'Email, name, and password are required please'});//want a return statement here so it stops the whole process, preventing it from still trying to create a user!
  }

  //Register new user using Passport Local Mongoose strategy
  User.register(new User({email, firstName, lastName}), password, function(err, user){
    if (err) {
      console.log(err);
      return res.status(422).send({error: 'Something went wrong with passport local mongoose'});
    }
    //No error, so new user is successfully signed up. Now let's sign them in using the local strategy created by passport-local-mongoose's User.createStrategy method (defined in services/passport.js and the user Schema) and send them a new JWT
    passport.authenticate('local', {session: false});
    res.send({
      token: userJWT(user),
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    });

  })

//=============================================================================================================================
//Using normal local strategy and bcrypt from tutorial
//============================================================================================================================
  // //see if a user with given email exists using req.body
  // User.findOne({email: email}, function(err, existingUser){
  //   //handle any potential errors associated with db
  //   if(err){ return next(err); }
  //
  //   //if email exists, throw an error
  //   if(existingUser){
  //     return res.status(422).send({error: 'That email is taken'});//again, use return keyword to stop evertying
  //   }
  //
  //   //if email is free, create new user and save it to db
  //   if(!existingUser){
  //     const user = new User({email, firstName, lastName, password});
  //     user.save(function(err){
  //       if(err){return next(err)};
  //
  //       //if all good, respond by giving the new user a web token (using the function defined above) which they can use to make authenticated requests in the future!
  //       res.json({
  //         token: userJWT(user),
  //         firstName: user.firstName
  //       });
  //     });
  //   }
  // })
//==================================================================================================================================
}
