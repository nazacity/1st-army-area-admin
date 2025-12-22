import { combineReducers } from 'redux';
import layoutReducer from './slices/layoutSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
});

export default rootReducer;
