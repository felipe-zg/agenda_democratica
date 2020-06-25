import {produce} from 'immer';
export const INITIAL_STATE = [];

export default function FavoriteEvents(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@FavoriteEvents/START_FAVORITE_EVENTS_LIST': {
                action.favorites.map((fave) => {
                    draft.push(fave);
                });
                break;
            }
            case '@FavoriteEvents/ADD_FAVORITE_EVENT': {
                draft.push(action.event);
                break;
            }
            case '@FavoriteEvents/DELETE_FAVORITE_EVENT': {
                const index = draft.findIndex((fave) => fave === action.event);
                draft.splice(index, 1);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
