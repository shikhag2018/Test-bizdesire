import { combineReducers } from 'redux';
import formReducer from './formReducer';

const rootReducer = combineReducers({
  form: formReducer,
  // Add other reducers here if needed
});

export default rootReducer;