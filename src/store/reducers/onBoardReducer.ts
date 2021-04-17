import { Action } from 'redux';
import { ONBOARD } from '../actions/actionTypes';

const initialState = {
    onBoarded: false,
};

const onBoardReducer = (state = initialState, { type }: Action) => {
    switch (type) {
        case ONBOARD.ADD:
            return { ...state, onBoarded: true };
        default:
            return { ...state };
    }
};

export default onBoardReducer;