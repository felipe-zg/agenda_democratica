import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignUp from '~/pages/candidate/register/SignUp';

const {getByTestId} = render(<SignUp />);

describe('e-mail input', () => {
    const input = getByTestId('email-input');
    it('should not have an error message if the e-mail is valid', () => {
        fireEvent.changeText(input, 'test@test.com');
        expect(input).toHaveProp('border', 'none');
    });

    it('should alert user if the e-mail is invalid', () => {
        fireEvent.changeText(input, 'test@test');
        expect(input).toHaveProp('border', '1px solid #f00');
    });
});

describe('e-mail confirmation input', () => {
    const input = getByTestId('confirmEmail-input');
    it('should not have an error message if the e-mail confirmation is valid', () => {
        fireEvent.changeText(input, 'test@test.com');
        expect(input).toHaveProp('border', 'none');
    });

    it('should alert user if the e-mail confirmation is invalid', () => {
        fireEvent.changeText(input, 'test@test');
        expect(input).toHaveProp('border', '1px solid #f00');
    });
});

describe('password input', () => {
    const input = getByTestId('password-input');
    it('should not have an error message if the password is valid', () => {
        // A password is valid when it has 6 characters or more
        fireEvent.changeText(input, '123456');
        expect(input).toHaveProp('border', 'none');
    });

    it('should alert user if password is invalid', () => {
        fireEvent.changeText(input, '12345');
        expect(input).toHaveProp('border', '1px solid #f00');
    });
});

describe('password confirmation input', () => {
    const input = getByTestId('confirmPassword-input');
    it('should not have an error message if the password confirmation is valid', () => {
        // A password is valid when it has 6 characters or more
        fireEvent.changeText(input, '123456');
        expect(input).toHaveProp('border', 'none');
    });

    it('should alert user if the password confirmation is invalid', () => {
        fireEvent.changeText(input, '12345');
        expect(input).toHaveProp('border', '1px solid #f00');
    });
});

describe('sign up button', () => {
    const emailInput = getByTestId('email-input');
    const confirmEmailInput = getByTestId('confirmEmail-input');
    const password = getByTestId('password-input');
    const confirmPassword = getByTestId('confirmPassword-input');
    const button = getByTestId('signUp-button');

    it('should be disabled if the e-mail is invalid', () => {
        fireEvent.changeText(emailInput, 'test@test');
        fireEvent.changeText(confirmEmailInput, 'test@test.com');
        fireEvent.changeText(password, '123456');
        fireEvent.changeText(confirmPassword, '123456');
        expect(button).toBeDisabled();
    });
    it('should be disabled if the e-mail confirmation is invalid', () => {
        fireEvent.changeText(emailInput, 'test@test.com');
        fireEvent.changeText(confirmEmailInput, 'test@test');
        fireEvent.changeText(password, '123456');
        fireEvent.changeText(confirmPassword, '123456');
        expect(button).toBeDisabled();
    });
    it('should be disabled if the password is invalid', () => {
        fireEvent.changeText(emailInput, 'test@test.com');
        fireEvent.changeText(confirmEmailInput, 'test@test.com');
        fireEvent.changeText(password, '12345');
        fireEvent.changeText(confirmPassword, '123456');
        expect(button).toBeDisabled();
    });
    it('should be disabled if the password confirmation is invalid', () => {
        fireEvent.changeText(emailInput, 'test@test');
        fireEvent.changeText(confirmEmailInput, 'test@test.com');
        fireEvent.changeText(password, '123456');
        fireEvent.changeText(confirmPassword, '12345');
        expect(button).toBeDisabled();
    });
    it('should be enabled if all the inputs have a valid value', () => {
        fireEvent.changeText(emailInput, 'test@test.com');
        fireEvent.changeText(confirmEmailInput, 'test@test.com');
        fireEvent.changeText(password, '123456');
        fireEvent.changeText(confirmPassword, '123456');
        expect(button).toBeEnabled();
    });
});
