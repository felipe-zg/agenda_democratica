import reducer, {INITIAL_STATE} from '~/store/modules/Address/reducer';
import * as Addresses from '~/store/modules/Address/actions';

const addressesList = [
    {
        street: 'street test',
        county: 'county test',
        number: '130',
        city: 'city test',
        cep: '0000000',
        addressKey: '-hags87h5s2hyg',
    },
    {
        street: 'street test 2',
        county: 'county test 2',
        number: '1302',
        city: 'city test 2',
        cep: '0000000',
        addressKey: '-hags87h584u7s',
    },
];

describe('Addresses reducer', () => {
    it('START_ADDRESSES_LIST', () => {
        const state = reducer(
            INITIAL_STATE,
            Addresses.startAddresses(addressesList),
        );
        expect(state).toStrictEqual(addressesList);
    });

    it('ADD_ADDRESS', () => {
        const address = {
            street: 'street test',
            county: 'county test',
            number: '130',
            city: 'city test',
            cep: '0000000',
            addressKey: '-hags87h5s2hyg',
        };
        const state = reducer(INITIAL_STATE, Addresses.addAddress(address));
        expect(state).toStrictEqual([address]);
    });

    it('DELETE_ADDRESS', () => {
        const newAddressesList = [
            {
                street: 'street test',
                county: 'county test',
                number: '130',
                city: 'city test',
                cep: '0000000',
                addressKey: '-hags87h5s2hyg',
            },
        ];
        const state = reducer(
            addressesList,
            Addresses.deleteAddress('hags87h584u7s'),
        );
        expect(state).toStrictEqual(newAddressesList);
    });

    it('CLEAR_ADDRESSES_LIST', () => {
        const state = reducer(addressesList, Addresses.clearAddressesList());
        expect(state).toStrictEqual(INITIAL_STATE);
    });
});
