import { PayloadAction } from '@reduxjs/toolkit';
import { USER } from '../actions/actionTypes';

import { User } from '../../types';

const initialState = {
  loading: true,
  user: null,
};

const userReducer = (
  state = initialState,
  { type, payload }: PayloadAction<User>,
) => {
  switch (type) {
    case USER.SAVE:
      return { ...state, loading: false, user: payload };
    case USER.DELETE:
      return { ...state, loading: false, user: null };
    default:
      return { ...state };
  }
};

export default userReducer;
