import { ONBOARD, AUTH, USER, SETTINGS } from './actionTypes';
import { User } from '../../types';

export const setDarkTheme = () => {
  return { type: SETTINGS.DARK };
};

export const setLightTheme = () => {
  return { type: SETTINGS.LIGHT };
};

export const onBoard = () => {
  return { type: ONBOARD.ADD };
};

export const login = (user: User) => {
  return { type: AUTH.LOGIN, payload: user };
};

export const saveUser = (user: User) => {
  return { type: USER.SAVE, payload: user };
};
