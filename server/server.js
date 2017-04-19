import express from 'express';
import graphql from 'graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import passport from 'passport';

//Local files
import schema from './schema/schema';
import router from './router';

//===========================
//Express App setup
//===========================
const app = express();
app.use(morgan('tiny')); //for logging HTTP requests in terminal
app.use(cors()); //allow for cross-origin requests
app.use (bodyParser.json()); //let me use response data as json

router(app);//set up routes for authentication
//==============================
//MongoDB and MongoLab setup
//==============================

//Connect to MongoLab
mongoose.Promise = global.Promise;
const MONGO_URL = 'mongodb://bfitzsimmons:bfitzsimmons@ds143980.mlab.com:43980/omnivor';
mongoose.connect(MONGO_URL);
mongoose.connection
    .once('open', () => console.log('MongoLab is connected Lord Commander.')) //Jon Snow FTW
    .on('error', error => console.log('Error connecting to MongoLab:', error));

//==================================
//GraphQL setup
//==================================
require('./services/passport'); //importing it just so the code is actually executed. With Node, need to import a file somewhere for it to be executed, and we want it to execute because it sets up our passport strategies!! Don't need to actually assign it to a variable

//setup passport as middleware! Saying, okay passport, when a user makes a request to a protected route, authenticate them using the jwt strategy that we made in services/passport.js, and DON'T make a session for them (because that's for cookies, not tokens)
const requireGraphQLAuth = passport.authenticate('jwt', {session: false});

//Set up graphql endpoint. Later, set up context options via http://dev.apollodata.com/tools/graphql-server/setup.html
app.use('/graphql', requireGraphQLAuth, graphqlExpress(request => ({
  schema,
  context: {user: request.user}
})));


//Set up GraphiQL UI
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql', //graphql because this specifies where GraphiQL sends its requests to. AKA our GraphQL endpoint.
}));

//===============================
//Set up Express listening port
//===============================
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log('Server is running Lord Commander');
})
