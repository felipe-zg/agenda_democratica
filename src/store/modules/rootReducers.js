import {combineReducers} from 'redux';
import Addresses from './Address/reducer';
import Events from './Event/reducer';

const rootReducer = combineReducers({
    Addresses,
    Events,
});

export default rootReducer;
