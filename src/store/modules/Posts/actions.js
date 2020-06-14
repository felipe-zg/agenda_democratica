export const startPosts = (posts) => {
    return {
        type: '@Posts/START_POSTS_LIST',
        posts,
    };
};
export const addPost = (post) => {
    return {
        type: '@Posts/ADD_POST',
        post,
    };
};

// export const updateEvent = (event) => {
//     return {
//         type: '@Event/UPDATE_EVENT',
//         event,
//     };
// };

export const deletePost = (key) => {
    return {
        type: '@Posts/DELETE_POST',
        key,
    };
};

export const clearPostsList = () => {
    return {
        type: '@Posts/CLEAR_POSTS_LIST',
    };
};
