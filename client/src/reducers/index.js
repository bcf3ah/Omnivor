import auth from './authReducers';
import {reducer as form} from 'redux-form';

const rootReducer = {
  auth,
  form
};

export default rootReducer;
