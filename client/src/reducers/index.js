import auth from './authReducers';
import {currentUserFirstName, currentUserLastName, currentUserID} from './currentUser';
import {reducer as form} from 'redux-form';

const rootReducer = {
  auth,
  currentUserFirstName,
  currentUserLastName,
  currentUserID,
  form
};

export default rootReducer;
