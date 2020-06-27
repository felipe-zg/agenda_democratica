import {produce} from 'immer';
export const INITIAL_STATE = [];

export default function LikedPosts(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@LikedPosts/START_LIKED_POSTS_LIST': {
                action.posts.map((post) => {
                    draft.push(post);
                });
                break;
            }
            case '@LikedPosts/LIKE_POST': {
                draft.push(action.post);
                break;
            }
            case '@LikedPosts/DISLIKE_POST': {
                const index = draft.findIndex((post) => post === action.post);
                draft.splice(index, 1);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
