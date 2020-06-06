import {combineReducers} from 'redux';
import Addresses from './Address/reducer';

const rootReducer = combineReducers({
    Addresses,
});

export default rootReducer;
