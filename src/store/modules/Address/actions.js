export const startAddresses = (addresses) => {
    return {
        type: '@Address/START_ADDRESSES_LIST',
        addresses,
    };
};
export const addAddress = (address) => {
    return {
        type: '@Address/ADD_ADDRESS',
        address,
    };
};

export const deleteAddress = (key) => {
    return {
        type: '@Address/DELETE_ADDRESS',
        key,
    };
};

export const clearAddressesList = () => {
    return {
        type: '@Address/CLEAR_ADDRESSES_LIST',
    };
};
