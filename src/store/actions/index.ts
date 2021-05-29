import { ONBOARD, AUTH } from './actionTypes';
import { User } from '../../types';

export const onBoard = () => {
  return { type: ONBOARD.ADD };
};

export const login = (user: User) => {
  return { type: AUTH.LOGIN, payload: user };
};
