import {produce} from 'immer';
export const INITIAL_STATE = [];

export default function Posts(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Posts/START_POSTS_LIST': {
                action.posts.map((post) => {
                    draft.push(post);
                });
                break;
            }
            case '@Posts/ADD_POST': {
                draft.push(action.post);
                break;
            }
            // case '@Event/UPDATE_EVENT': {
            //     const index = draft.findIndex(
            //         (event) => event.eventKey === action.event.eventKey,
            //     );
            //     draft[index] = action.event;
            //     break;
            // }
            case '@Posts/DELETE_POST': {
                const index = draft.findIndex(
                    (post) => post.postKey === action.key,
                );
                draft.splice(index, 1);
                break;
            }
            case '@Posts/CLEAR_POSTS_LIST': {
                draft.splice(0, draft.length);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
