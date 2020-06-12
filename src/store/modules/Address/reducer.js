import {produce} from 'immer';

export const INITIAL_STATE = [];

export default function Addresses(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@Address/START_ADDRESSES_LIST': {
                action.addresses.map((address) => {
                    draft.push(address);
                });
                break;
            }
            case '@Address/ADD_ADDRESS': {
                draft.push(action.address);
                break;
            }
            case '@Address/DELETE_ADDRESS': {
                const index = draft.findIndex(
                    (address) => address.addressKey === action.key,
                );
                draft.splice(index, 1);
                break;
            }
            case '@Address/CLEAR_ADDRESSES_LIST': {
                draft.splice(0, draft.length);
                break;
            }
            default: {
                return state;
            }
        }
    });
}
