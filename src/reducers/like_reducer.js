import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';


import {
    LIKE_PLACE,
    CLEAR_LIKED_PLACES
} from './../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedPlaces || INITIAL_STATE;
        case LIKE_PLACE:
            const newArray = _.uniqBy([
                ...state, action.payload
            ], 'name');
            const message = newArray.length === state.length
                                ? 'Place already liked'
                                : 'Place has been saved';

            alert(message);
            return newArray;
        case CLEAR_LIKED_PLACES:
            alert('Review Cleared');
            return INITIAL_STATE;

        default:
            return state;
    }
};