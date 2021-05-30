import { Action } from '@reduxjs/toolkit';
import { SETTINGS } from '../actions/actionTypes';

import { Settings } from '../../types';

const initialState = {
  dark: true,
};

const settingsReducer = (state = initialState, { type }: Action) => {
  switch (type) {
    case SETTINGS.DARK:
      return { ...state, dark: true };
    case SETTINGS.LIGHT:
      return { ...state, dark: false };
    default:
      return { ...state };
  }
};

export default settingsReducer;
