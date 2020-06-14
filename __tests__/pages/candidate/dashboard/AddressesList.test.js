import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fireEvent, render} from '@testing-library/react-native';
import AddressesList from '~/pages/candidate/dashboard/AddressesList';

jest.mock('react-redux');

const {getByTestId, getByText} = render(<AddressesList />);

describe('List item', () => {
    it('should render addresses', () => {
        useSelector.mockImplementation((cb) =>
            cb({
                Addresses: [
                    {
                        street: 'test street',
                        num: '10',
                        county: 'test county',
                        addressKey: 'gdy6asd',
                    },
                ],
            }),
        );
    });
    // expect(getByText('10')).toBeTruthy();
    it('should call dispatch with address key when user deletes address', () => {});
});
