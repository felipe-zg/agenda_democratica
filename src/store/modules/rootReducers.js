import {combineReducers} from 'redux';
import Addresses from './Address/reducer';
import Events from './Event/reducer';
import Posts from './Posts/reducer';
import Candidate from './Candidate/reducer';
import Voter from './Voter/reducer';

const rootReducer = combineReducers({
    Addresses,
    Events,
    Posts,
    Candidate,
    Voter,
});

export default rootReducer;
