import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

//Local Files
import rootReducer from './reducers/index';
import App from './components/App';
import HomeFeed from './components/homeFeed';
import AuthForms from './components/auth/authForms';
import RequireAuth from './components/requireAuth';
import './styles/index.css';


//ApolloClient setup
const networkInterface = createNetworkInterface({
	uri: '/graphql', //tell GraphQL the endpoint of our GQL API
	opts: {
		credentials: 'same-origin'
	}
});

//Tell GQL to attach the user's JWT in the header of any query for authorization and to get current user
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // get the authentication token from local storage if it exists, and send that sucka along with all GQL queries
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? token : null;
    next();
  }
}]);

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: o => o.id //tell GQL to keep tabs on all objects for requerying
});


//Redux and Apollo Store setup
const apollClientReducer = {apollo: client.reducer()}
const reducers = Object.assign(rootReducer, apollClientReducer);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(
	combineReducers(reducers),
    compose(
        applyMiddleware(client.middleware())
  )
);

//if token exists, consider user to be signed in. Using AuthToken since we use token above with Apollo
const AuthToken = localStorage.getItem('token');
if(AuthToken){
  //create an instance of the redux store where the user is authenticated
  store.dispatch({type: 'AUTH_USER'});
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
				<Route path='/signin' component={AuthForms} />
				<Route path='/home' component={RequireAuth(HomeFeed)} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
