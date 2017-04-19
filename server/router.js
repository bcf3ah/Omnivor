import authentication from './controllers/authentication';
require('./services/passport'); //importing it just so the code is actually executed. With Node, need to import a file somewhere for it to be executed, and we want it to execute because it sets up our passport strategies!! Don't need to actually assign it to a variable
import passport from 'passport';

//setup passport as middleware! Saying, okay passport, when a user makes a request to a protected route, authenticate them using the jwt strategy that we made in services/passport.js, and DON'T make a session for them (because that's for cookies, not tokens)
const requireAuth = passport.authenticate('jwt', {session: false});
const requireAuthOnSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
    app.get('/', requireAuth, function(req, res){ //saying any request to this route will pass through our auth middleware first! If not authorized, we'll see an "unauthorized" message in the response. If not, we'll see....
      res.send('If you are seeing this, the secret key is SHIBBIDY DIBBIDY');
    });

    app.get('/checkUser', requireAuth, function(req, res){ //if logged in, this should send the data of the current user. Passport assigns
      res.send(req.user);
    });

    app.post('/signin', requireAuthOnSignin, authentication.signin); //sending the login process through middleware that checks if the password is correct, then to the helper function in authentication.js that gives the now logged in user a token

    app.post('/signup', authentication.signup);//using the auth controller, which handles request logic for this route. Don't need req, res, next and all that because the auth.signup is the callback function!
}

//Now, if we want to protect any routes now, we just have to pass in requireAuth as the second argument (ie as middleware) ANd the third argument will be whatever the protected route is
