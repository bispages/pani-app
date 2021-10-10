import { ONBOARD, AUTH, USER, SETTINGS, ESTIMATE } from './actionTypes';
import { User, EstimateItem } from '../../types';

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

export const addToEstimate = (estimateItems: EstimateItem[]) => {
  return { type: ESTIMATE.MATERIAL_ADD, payload: estimateItems };
};
