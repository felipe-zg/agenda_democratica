import {produce} from 'immer';
export const INITIAL_STATE = [];

export default function Events(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Event/START_EVENTS_LIST': {
                action.events.map((event) => {
                    draft.push(event);
                });
                break;
            }
            case '@Event/ADD_EVENT': {
                draft.push(action.event);
                break;
            }
            case '@Event/UPDATE_EVENT': {
                const index = draft.findIndex(
                    (event) => event.eventKey === action.event.eventKey,
                );
                draft[index] = action.event;
                break;
            }
            case '@Event/DELETE_EVENT': {
                const index = draft.findIndex(
                    (event) => event.eventKey === action.key,
                );
                draft.splice(index, 1);
                break;
            }
            case '@Event/CLEAR_EVENTS_LIST': {
                draft.splice(0, draft.length);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
