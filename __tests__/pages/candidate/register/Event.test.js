import React, {Component} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Event from '~/pages/candidate/register/Event';
import {useSelector} from 'react-redux';

jest.mock('react-redux');

useSelector.mockImplementation((cb) =>
    cb({
        Addresses: [
            {
                street: 'test street',
                num: '10',
                county: 'test county',
                addressKey: 'gdy6asd',
            },
            {
                street: 'test street',
                um: '10',
                county: 'test county',
                addressKey: 'gdy6asf',
            },
        ],
    }),
);

const {getByTestId, getByText} = render(<Event />);
const titleInput = getByTestId('title-input');
const dateInput = getByTestId('date-input');
const categoryInput = getByTestId('category-input');
const addressInput = getByTestId('address-input');
const descriptionInput = getByTestId('description-input');
const button = getByTestId('register-button');

describe('Title input', () => {
    it('should alert user if title is isvalid', () => {
        // a title must have at least 8 characters to be valid
        fireEvent.changeText(titleInput, 'test');
        expect(titleInput).toHaveProp('border', '1px solid #f00');
    });
    it('should not have an error message if title is valid', () => {
        fireEvent.changeText(titleInput, 'test title');
        expect(titleInput).toHaveProp('border', 'none');
    });
    it('should not have an error message if title is blank', () => {
        fireEvent.changeText(titleInput, '');
        expect(titleInput).toHaveProp('border', 'none');
    });
});

describe('Date input', () => {
    it('should alert user if date is isvalid', () => {
        fireEvent.changeText(dateInput, '01/01/202');
        expect(dateInput).toHaveProp('border', '1px solid #f00');
    });
    it('should not have an error message if date is valid', () => {
        fireEvent.changeText(dateInput, '01/01/2020');
        expect(dateInput).toHaveProp('border', 'none');
    });
    it('should not have an error message if date is blank', () => {
        fireEvent.changeText(dateInput, '');
        expect(dateInput).toHaveProp('border', 'none');
    });
});

describe('Description input', () => {
    it('should alert user if description is isvalid', () => {
        // The description must have at least 100 characters to be valid
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test',
        );
        expect(descriptionInput).toHaveProp('border', '1px solid #f00');
    });
    it('should not have an error description if title is valid', () => {
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(descriptionInput).toHaveProp('border', 'none');
    });
    it('should not have an error description if title is blank', () => {
        fireEvent.changeText(descriptionInput, '');
        expect(descriptionInput).toHaveProp('border', 'none');
    });
});

describe('Register button', () => {
    it('should be disabled if title is invalid', () => {
        fireEvent.changeText(titleInput, 'test');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if date is invalid', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '01/01/202');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if description is invalid', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if title is blank', () => {
        fireEvent.changeText(titleInput, '');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if date is blank', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if category is not selected', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, '');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if address is not selected', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, '');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeDisabled();
    });
    it('should be disabled if description is blank', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(descriptionInput, '');
        expect(button).toBeDisabled();
    });
    it('should be disabled if all the inputs are blank', () => {
        fireEvent.changeText(titleInput, '');
        fireEvent.changeText(dateInput, '');
        fireEvent.changeText(categoryInput, '');
        fireEvent.changeText(addressInput, '');
        fireEvent.changeText(descriptionInput, '');
        expect(button).toBeDisabled();
    });
    it('should be enabled if all the inputs are valid', () => {
        fireEvent.changeText(titleInput, 'test title');
        fireEvent.changeText(dateInput, '11/11/1111');
        fireEvent.changeText(categoryInput, 'test category');
        fireEvent.changeText(addressInput, 'test address');
        fireEvent.changeText(
            descriptionInput,
            'test test test test test test test test test test test test test test test test test test test test test ',
        );
        expect(button).toBeEnabled();
    });
});
