import { combineReducers } from 'redux';
import getLocations from './location_reducer';
import likedPlaces from './like_reducer';

export default combineReducers({
    getLocations,
    likedPlaces
});