export const startCandidate = (candidate) => {
    return {
        type: '@Candidate/START_CANDIDATE',
        candidate,
    };
};

export const updateInfo = (field, value) => {
    return {
        type: '@Candidate/UPDATE_INFO',
        field,
        value,
    };
};

export const clearCandidate = () => {
    return {
        type: '@Candidate/CLEAN_CANDIDATE',
    };
};
