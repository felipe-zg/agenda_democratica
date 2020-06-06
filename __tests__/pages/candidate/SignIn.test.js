import React from 'react';
import Signin from '~/pages/SignIn';
import {render, fireEvent} from '@testing-library/react-native';

describe('email input', () => {
    const {getByTestId} = render(<Signin />);

    it('should not have an error message when the e-mail is valid', () => {
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        expect(getByTestId('email-input')).toHaveProp('border', 'none');
    });

    it('should alert user when e-mail is invalid', () => {
        fireEvent.changeText(getByTestId('email-input'), 'test@test');
        // expect(getByTestId('email-input-error-message')).toEqual(
        //     'E-mail inválidoo',
        // );
        expect(getByTestId('email-input')).toHaveProp(
            'border',
            '1px solid #f00',
        );
    });
});

describe('password input', () => {
    const {getByTestId} = render(<Signin />);
    // A password is valid when it has 6 or more characters
    it('should not have an error message when the password is valid', () => {
        fireEvent.changeText(getByTestId('password-input'), '123456');
        expect(getByTestId('password-input')).toHaveProp('border', 'none');
    });

    it('should alert user when password is invalid', () => {
        fireEvent.changeText(getByTestId('password-input'), '12345');
        // expect(getByTestId('password-input-error-message')).toEqual(
        //     'Minimo de 6 caracteres',
        // );
        expect(getByTestId('password-input')).toHaveProp(
            'border',
            '1px solid #f00',
        );
    });
});

describe('Sigin button', () => {
    const {getByTestId} = render(<Signin />);
    it('should be disabled when e-mail is invalid', () => {
        fireEvent.changeText(getByTestId('email-input'), 'test@test');
        fireEvent.changeText(getByTestId('password-input'), '123456');
        expect(getByTestId('signIn-button')).toBeDisabled();
    });
    it('should be disabled when password is invalid', () => {
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        // A password is valid when it has 6 or more characters
        fireEvent.changeText(getByTestId('password-input'), '12345');
        expect(getByTestId('signIn-button')).toBeDisabled();
    });
    it('should be enabled when e-mail and password are valid', () => {
        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.changeText(getByTestId('password-input'), '123456');
        expect(getByTestId('signIn-button')).toBeEnabled();
    });
});
