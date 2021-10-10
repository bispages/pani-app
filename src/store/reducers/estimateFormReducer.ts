import { PayloadAction } from '@reduxjs/toolkit';
import { ESTIMATE } from '../actions/actionTypes';

import { EstimateItem } from '../../types';

const initialState: EstimateItem[] = [];

const estimateFormReducer = (
  state = initialState,
  { type, payload }: PayloadAction<EstimateItem[]>,
) => {
  switch (type) {
    case ESTIMATE.MATERIAL_ADD:
      return payload;
    default:
      return state;
  }
};

export default estimateFormReducer;
