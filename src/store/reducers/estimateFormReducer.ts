import { PayloadAction } from '@reduxjs/toolkit';
import { ESTIMATE } from '../actions/actionTypes';

import { EstimateForm, EstimateItem, Customer } from '../../types';

const initialState: EstimateForm = {
  customer: {},
  estimateItems: [],
};

const estimateFormReducer = (
  state: EstimateForm = initialState,
  { type, payload }: PayloadAction<EstimateItem[] | Customer>,
) => {
  switch (type) {
    case ESTIMATE.MATERIAL_ADD:
      return { ...state, estimateItems: payload };
    case ESTIMATE.CUSTOMER_ADD:
      return { ...state, customer: payload };
    default:
      return state;
  }
};

export default estimateFormReducer;
