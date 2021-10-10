import { combineReducers } from 'redux';

import settingsReducer from './settingsReducer';
import onBoardReducer from './onBoardReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import estimateFormReducer from './estimateFormReducer';

/**
 * @description - Root reducer.
 * @param {Array} state - State val.
 * @returns {Array} - State values.
 */
const rootReducer = combineReducers({
  onboard: onBoardReducer,
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
  estimate: estimateFormReducer,
});

export default rootReducer;
