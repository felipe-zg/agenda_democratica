export const startVoter = (voter) => {
    return {
        type: '@Voter/START_VOTER',
        voter,
    };
};

export const updateVoter = (voter) => {
    return {
        type: '@Voter/UPDATE_VOTER',
        voter,
    };
};

export const clearUser = () => {
    return {
        type: '@Voter/CLEAR_VOTER',
    };
};
