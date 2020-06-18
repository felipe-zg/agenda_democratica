import {produce} from 'immer';
export const INITIAL_STATE = null;

export default function Posts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@Candidate/START_CANDIDATE': {
            return action.candidate;
        }
        case '@Candidate/UPDATE_INFO': {
            return produce(state, (draft) => {
                switch (action.field) {
                    case 'campaignName': {
                        draft.campaignName = action.value;
                        break;
                    }
                    case 'viceName': {
                        draft.viceName = action.value;
                        break;
                    }
                    case 'party': {
                        draft.party = action.value;
                        break;
                    }
                    case 'number': {
                        draft.number = action.value;
                        break;
                    }
                    case 'about': {
                        draft.about = action.value;
                        break;
                    }
                    case 'photo': {
                        draft.photo = action.value;
                        break;
                    }
                    default: {
                        return draft;
                    }
                }
            });
        }
        case '@Candidate/CLEAR_CANDIDATE': {
            return null;
        }
        default: {
            return state;
        }
    }
}
