export const startFollowedCandidatesList = (candidates) => {
    return {
        type: '@FollowedCandidates/START_FOLLOWED_CANDIDATES_LIST',
        candidates,
    };
};

export const addFollowedCandidate = (candidate) => {
    return {
        type: '@FollowedCandidates/ADD_FOLLOWED_CANDIDATE',
        candidate,
    };
};

export const deleteFollowedCandidate = (candidate) => {
    return {
        type: '@FollowedCandidates/DELETE_FOLLOWED_CANDIDATE',
        candidate,
    };
};
