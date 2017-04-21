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
import TopicList from './components/Topics/topicList';
import AuthForms from './components/auth/authForms';
import RequireAuth from './components/requireAuth';
import Signout from './components/auth/signout';
import TopicDetail from './components/Topics/topicDetail';
import ProfileHome from './components/Profile/profileHome';
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
	networkInterface
	//dataIdFromObject: o => o.id //tell GQL to keep tabs on all objects for requerying
});


//Redux and Apollo Store setup
const apollClientReducer = {apollo: client.reducer()}
const reducers = Object.assign(rootReducer, apollClientReducer);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for setting up redux dev tools

const store = createStoreWithMiddleware(
	combineReducers(reducers),
    composeEnhancers(
        applyMiddleware(client.middleware())
  )
);

//if token exists, consider user to be signed in. Using AuthToken since we use token above with Apollo
const AuthToken = localStorage.getItem('token');
const currentUserFirstName = localStorage.getItem('currentUserFirstName');
const currentUserLastName = localStorage.getItem('currentUserLastName');
const currentUserID = localStorage.getItem('currentUserID');

if(AuthToken && currentUserFirstName && currentUserLastName){
  //create an instance of the redux store where the user is authenticated and the currentUserName is set to the authed user's name
  store.dispatch({type: 'AUTH_USER'});
	store.dispatch({
		type: 'SET_CURRENT_USER_FIRSTNAME',
		payload: currentUserFirstName
	});
	store.dispatch({
		type: 'SET_CURRENT_USER_LASTNAME',
		payload: currentUserLastName
	});
	store.dispatch({
		type: 'SET_CURRENT_USER_ID',
		payload: currentUserID
	});
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
				<Route path='/signin' component={AuthForms} />
				<Route path='/signout' component={Signout} />
				<Route path='/profile' component={RequireAuth(ProfileHome)} />
				<Route path='/home' component={RequireAuth(TopicList)} />
				<Route path='/topics/:topicId' component={RequireAuth(TopicDetail)} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
