export const startLikedPostsList = (posts) => {
    return {
        type: '@LikedPosts/START_LIKED_POSTS_LIST',
        posts,
    };
};

export const likePost = (post) => {
    return {
        type: '@LikedPosts/LIKE_POST',
        post,
    };
};

export const dislikePost = (post) => {
    return {
        type: '@LikedPosts/DISLIKE_POST',
        post,
    };
};
