import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Address from '~/pages/candidate/register/Address';

const {getByTestId, getByText} = render(<Address />);

describe('CEP input', () => {
    const input = getByTestId('CEP-input');
    it('should alert user if CEP is invalid', () => {
        fireEvent.changeText(input, '1234567');
        expect(getByText('CEP inválido')).toBeTruthy();
        expect(input).toHaveProp('border', '1px solid #f00');
    });
    it('should not have an error message if the cep is blank', () => {
        fireEvent.changeText(input, '');
        expect(getByText('CEP')).toBeTruthy();
        expect(input).toHaveProp('border', 'none');
    });
    it('should not have an error message if the cep is valid', () => {
        fireEvent.changeText(input, '12345678');
        expect(getByText('CEP')).toBeTruthy();
        expect(input).toHaveProp('border', 'none');
    });
});

describe('Register button ', () => {
    const streetInput = getByTestId('street-input');
    const countyInput = getByTestId('county-input');
    const numberInput = getByTestId('number-input');
    const cityInput = getByTestId('city-input');
    const CEPInput = getByTestId('CEP-input');
    const button = getByTestId('register-button');

    it('should be disabled if street input is blank', () => {
        fireEvent.changeText(streetInput, '');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '28970000');
        expect(button).toBeDisabled();
    });
    it('should be disabled if county input is blank', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, '');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '28970000');
        expect(button).toBeDisabled();
    });
    it('should be disabled if number input is blank', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '28970000');
        expect(button).toBeDisabled();
    });
    it('should be disabled if city input is blank', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, '');
        fireEvent.changeText(CEPInput, '28970000');
        expect(button).toBeDisabled();
    });
    it('should be disabled if CEP input is blank', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '');
        expect(button).toBeDisabled();
    });
    it('should be disabled if CEP input is invalid', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '2897000');
        expect(button).toBeDisabled();
    });
    it('should be disabled if all the inputs are blank', () => {
        fireEvent.changeText(streetInput, '');
        fireEvent.changeText(countyInput, '');
        fireEvent.changeText(numberInput, '');
        fireEvent.changeText(cityInput, '');
        fireEvent.changeText(CEPInput, '');
        expect(button).toBeDisabled();
    });
    it('should be disabled if all the inputs are invalid', () => {
        fireEvent.changeText(streetInput, '');
        fireEvent.changeText(countyInput, '');
        fireEvent.changeText(numberInput, '');
        fireEvent.changeText(cityInput, '');
        fireEvent.changeText(CEPInput, '28970');
        expect(button).toBeDisabled();
    });
    it('should be enabled if all the inputs are valid', () => {
        fireEvent.changeText(streetInput, 'testStreet');
        fireEvent.changeText(countyInput, 'testCounty');
        fireEvent.changeText(numberInput, '123');
        fireEvent.changeText(cityInput, 'testCity');
        fireEvent.changeText(CEPInput, '28970000');
        expect(button).toBeEnabled();
    });
});
