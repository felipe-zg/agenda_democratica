import {combineReducers} from 'redux';
import Addresses from './Address/reducer';
import Events from './Event/reducer';
import Posts from './Posts/reducer';
import Candidate from './Candidate/reducer';
import Voter from './Voter/reducer';
import FollowedCandidates from './FollowedCandidates/reducer';
import FavoriteEvents from './FavoriteEvents/reducer';
import LikedPosts from './LikedPosts/reducer';

const rootReducer = combineReducers({
    Addresses,
    Events,
    Posts,
    Candidate,
    Voter,
    FollowedCandidates,
    FavoriteEvents,
    LikedPosts,
});

export default rootReducer;
