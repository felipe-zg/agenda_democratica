import {produce} from 'immer';

export default function Addresses(state = [], action) {
    switch (action.type) {
        case '@Address/START_ADDRESSES_LIST': {
            if (action.addresses.length > 0) {
                return action.addresses;
            } else {
                return state;
            }
        }
        case '@Address/ADD_ADDRESS': {
            return produce(state, (draft) => {
                draft.push(action.address);
            });
        }
        case '@Address/DELETE_ADDRESS': {
            return produce(state, (draft) => {
                console.warn('reducer');
                const index = draft.findIndex(
                    (a) => a.addressKey === action.key,
                );
                draft.splice(index, 1);
            });
        }
        default: {
            return state;
        }
    }
}
