import { combineReducers } from 'redux';
import onBoardReducer from './onBoardReducer';

/**
 * @description - Root reducer.
 * @param {Array} state - State val.
 * @returns {Array} - State values.
 */
const rootReducer = combineReducers({
  onboard: onBoardReducer,
});

export default rootReducer;
