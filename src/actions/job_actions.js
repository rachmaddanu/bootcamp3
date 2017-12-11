import axios from 'axios';
import qs from 'qs';

import {
    FETCH_MAPS, LIKE_PLACE, CLEAR_LIKED_PLACES
} from './types';

const MAP_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const MAP_QUERY_PARAMS = {
    location: '', 
    radius: '500',
    type: '',
    key: 'AIzaSyDsaEYzEfYDFmD8QjRgy4SPhaJftg4_l9w '
};

//TODO
//Terima Region
//Fetcg indeed API berdasarkan API
//Return action dengan payload data dari fetch API

const buildMapUrl = (location, keyword) => {
    const params = qs.stringify({ 
        ...MAP_QUERY_PARAMS, 
        location: `${location.latitude}, ${location.longitude}`,
        type: keyword 
    });
    return MAP_ROOT_URL + params;
};

export const fetchMap = (location, keyword, callback) => {
    return async (dispatch) => {
        try {
            const url = buildMapUrl(location, keyword);
            const response = await axios.get(url);
            console.log('url', url)
            console.log('res', response.data.results)
            dispatch({
                type: FETCH_MAPS,
                payload: response.data.results
            });

            callback();
        } catch (error) {
            console.log(error);
        }
    };
};

export const likePlace = (place) => {
    return {
        type: LIKE_PLACE,
        payload: place
    };
};

export const clearLikedPlaces = () => {
    return {
        type: CLEAR_LIKED_PLACES
    };
};