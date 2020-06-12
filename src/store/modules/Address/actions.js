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

export const cleanAddressesList = () => {
    return {
        type: '@Address/CLEAN_ADDRESSES_LIST',
    };
};
