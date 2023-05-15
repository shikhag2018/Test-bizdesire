import { combineReducers } from 'redux';
import formReducer from './formReducer';
import candidateReducer from './candidatesReducer';

const rootReducer = combineReducers({
  candidateForm: formReducer,
  candidates: candidateReducer
  // Add other reducers here if needed
});

export default rootReducer;