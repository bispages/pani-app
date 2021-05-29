import { combineReducers } from 'redux';

import onBoardReducer from './onBoardReducer';
import authReducer from './authReducer';

/**
 * @description - Root reducer.
 * @param {Array} state - State val.
 * @returns {Array} - State values.
 */
const rootReducer = combineReducers({
  onboard: onBoardReducer,
  auth: authReducer,
});

export default rootReducer;
