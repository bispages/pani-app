import { PayloadAction } from '@reduxjs/toolkit';
import { AUTH } from '../actions/actionTypes';

import { User } from '../../types';

const initialState = {
  loading: true,
  login: false,
  user: null,
};

const authReducer = (
  state = initialState,
  { type, payload }: PayloadAction<User>,
) => {
  switch (type) {
    case AUTH.LOGIN:
      return { ...state, loading: false, login: true, user: payload };
    case AUTH.LOGOUT:
      return { ...state, loading: false, login: false, user: null };
    default:
      return { ...state };
  }
};

export default authReducer;
