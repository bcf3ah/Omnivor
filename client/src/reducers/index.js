import auth from './authReducers';
import currentUserName from './currentUserName';
import {reducer as form} from 'redux-form';

const rootReducer = {
  auth,
  currentUserName,
  form
};

export default rootReducer;
