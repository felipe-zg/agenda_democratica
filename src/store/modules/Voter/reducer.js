import {produce} from 'immer';
export const INITIAL_STATE = null;

export default function Voter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@Voter/START_VOTER': {
            return action.voter;
        }
        case '@Voter/CLEAR_VOTER': {
            return null;
        }
        default: {
            return state;
        }
    }
}
