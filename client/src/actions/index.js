import axios from 'axios';
import {browserHistory} from 'react-router';
const API_URL = 'http://localhost:4000';

export function signin({email, password}){
    //with redux-thunk, can no return a function instead of an object. And in that function, can do any logic you want! Then, when ready, call the dispatch method inside the function with your action object type as the parameter.
    return function(dispatch){
      //submit email/password to our API server using axios
      axios.post(`${API_URL}/signin`, {email, password})//if request is successful...(use promise, not if statement, because Axios returns a promise)
        .then(response => {
          //save user's firstName from response to Redux store (for navbar usage. Don't want to keep querying for findCurrentUser) AND to local storage because I need the user's firstName to persist evenn if they refresh the page (and the redux store is reset after refreshes. authenticated: true persisted only because I AUTH_USER if a token is present in local store, which survives refreshes. Need to do the same for firstName now)
          dispatch({
            type: 'SET_CURRENT_USER_NAME',
            payload: response.data.firstName
          });

          localStorage.setItem('currentUserName', response.data.firstName);

          //update state to reflect that the user is authenticated
          dispatch({type: 'AUTH_USER'});//we set up a reducer that flips auth state to TRUE when this action.type comes in

          //save JWT to local storage using native localStorage method
          localStorage.setItem('token', response.data.token);

          //redirect to '/secret'
          browserHistory.push('/home');
        })
        .catch(() => {
          //if request if unsuccessful, show error to user using authError action creator we defined below
          dispatch(authError('Incorrect email or password'));
        });
    }
}

//signup action creator
export function signup({email, firstName, lastName, password}){ //should look pretty similar to loginUser, as process is almost identical
  return function(dispatch){
    //submit email/password to our API server using axios
    axios.post(`${API_URL}/signup`, {email, firstName, lastName, password})//if request is successful...(use promise, not if statement, because Axios returns a promise)
      .then(response => {
        //save user's firstName from response to Redux store (for navbar usage. Don't want to keep querying for findCurrentUser) AND to local storage because I need the user's firstName to persist evenn if they refresh the page (and the redux store is reset after refreshes. authenticated: true persisted only because I AUTH_USER if a token is present in local store, which survives refreshes. Need to do the same for firstName now)
        dispatch({
          type: 'SET_CURRENT_USER_NAME',
          payload: response.data.firstName
        });

        localStorage.setItem('currentUserName', response.data.firstName);

        //update state to reflect that the user is authenticated
        dispatch({type: 'AUTH_USER'});//we set up a reducer that flips auth state to TRUE when this action.type comes in

        //save JWT to local storage using native localStorage method
        localStorage.setItem('token', response.data.token);

        //redirect to '/secret'
        browserHistory.push('/home');
      })
      .catch(error => {
        //if request if unsuccessful, show error to user using authError action creator we defined below
        dispatch(authError(error.response.data.error));
      });
  }
}

//create separate action for auth errors
export function authError(error){
  return {
    type: 'AUTH_ERROR',
    payload: error
  }
}

//create action for logging out
export function signout(){
  localStorage.removeItem('token');
  return {
    type: 'UNAUTH_USER'
  }
}



// export function fetchMessage(){
//   return function(dispatch){
//     axios.get(API_URL, {
//       headers: {authorization: localStorage.getItem('token')}//this lets us put stuff inside the header of the request. And we set up our backend to look for something called authorization for protected routes
//     })
//       .then(response => {
//         dispatch({
//           type: 'FETCH_MESSAGE',
//           payload: response.data
//         })
//       });
//   }
// }
