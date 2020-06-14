import {combineReducers} from 'redux';
import Addresses from './Address/reducer';
import Events from './Event/reducer';
import Posts from './Posts/reducer';

const rootReducer = combineReducers({
    Addresses,
    Events,
    Posts,
});

export default rootReducer;
