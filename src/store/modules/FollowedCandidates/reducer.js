import immer, {produce} from 'immer';
export const INITIAL_STATE = [];

export default function FollowedCandidates(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@FollowedCandidates/START_FOLLOWED_CANDIDATES_LIST': {
                action.candidates.map((candidate) => {
                    draft.push(candidate);
                });
                break;
            }
            case '@FollowedCandidates/ADD_FOLLOWED_CANDIDATE': {
                draft.push(action.candidate);
                break;
            }
            case '@FollowedCandidates/DELETE_FOLLOWED_CANDIDATE': {
                const index = draft.findIndex(
                    (followed) => followed === action.candidate,
                );
                draft.splice(index, 1);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
