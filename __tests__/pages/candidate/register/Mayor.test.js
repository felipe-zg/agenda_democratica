import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Mayor from '~/pages/candidate/register/Mayor';

const {getByTestId, getByText} = render(<Mayor />);

describe('Name input', () => {
    const input = getByTestId('name-input');
    it('should alert user if full name is invalid', () => {
        // A full name is valid when it has at least 2 words
        fireEvent.changeText(input, 'testName');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('Nome e sobrenome obrigatórios')).toBeTruthy();
    });
    it('should not have an error message if the full name is valid', () => {
        fireEvent.changeText(input, 'testName testLastName');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Nome completo')).toBeTruthy();
    });
});

describe('Campaing name', () => {
    const input = getByTestId('campaignName-input');
    it('should alert user if the campaing name is invalid', () => {
        //Campaign name must have at least 4 chacyers to be valid
        fireEvent.changeText(input, 'nam');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('Mínimo de 4 caracteres')).toBeTruthy();
    });
    it('should not have an error message if the campaign name is valid', () => {
        fireEvent.changeText(input, 'name');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Nome de campanha')).toBeTruthy();
    });
});

describe('Vice candidate name input', () => {
    const input = getByTestId('viceName-input');
    it('should alert user if the vice name is invalid', () => {
        //The vice name must have at least 4 chacyers to be valid
        fireEvent.changeText(input, 'nam');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('Mínimo de 4 caracteres')).toBeTruthy();
    });
    it('should not have an error message if the vice name is valid', () => {
        fireEvent.changeText(input, 'name');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Nome do vice')).toBeTruthy();
    });
});

describe('Party input', () => {
    const input = getByTestId('party-input');
    it('should alert user if the party name is invalid', () => {
        //The party name must have at least 2 characters to be valid
        fireEvent.changeText(input, 'P');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('Sigla inválida')).toBeTruthy();
    });
    it('should not have an error message if the party name is valid', () => {
        fireEvent.changeText(input, 'TEST');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Sigla do partido')).toBeTruthy();
    });
});

describe('Party number input', () => {
    const input = getByTestId('partyNumber-input');
    it('should alert user if the party number is invalid', () => {
        //The party number must have 2 characters to be valid
        fireEvent.changeText(input, '1');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('Número inválido')).toBeTruthy();
    });
    it('should not have an error message if the party name is valid', () => {
        fireEvent.changeText(input, '12');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Número do candidato')).toBeTruthy();
    });
});

describe('TSE register number input', () => {
    const input = getByTestId('registerNumber-input');
    it('should alert user if the register number is invalid', () => {
        //The register number must have 10 characters to be valid
        fireEvent.changeText(input, '123456789');
        expect(input).toHaveProp('border', '1px solid #f00');
        expect(getByText('identificação inválida')).toBeTruthy();
    });
    it('should not have an error message if the party name is valid', () => {
        fireEvent.changeText(input, '1234567890');
        expect(input).toHaveProp('border', 'none');
        expect(getByText('Número de registro')).toBeTruthy();
    });
});

describe('First form next button', () => {
    const nameInput = getByTestId('name-input');
    const campaignNameInput = getByTestId('campaignName-input');
    const viceName = getByTestId('viceName-input');
    const partyInput = getByTestId('party-input');
    const partyNumberInput = getByTestId('partyNumber-input');
    const registerNumberInput = getByTestId('registerNumber-input');
    const button = getByTestId('first-form-next-button');

    it('should be disabled if name is invalid', () => {
        // A name should have at least 2 words to be valid
        fireEvent.changeText(nameInput, 'testName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if name is blank', () => {
        fireEvent.changeText(nameInput, '');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if campaign name is invalid', () => {
        // The caimpaign name should have at least 4 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'tes');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if campaign name is blank', () => {
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, '');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if vice name is invalid', () => {
        // The vice name should have at least 4 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'tes');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if vice name is blank', () => {
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, '');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if party is invalid', () => {
        // The party should have at least 2 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'T');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if party is blank', () => {
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, '');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if party number is invalid', () => {
        // The party number should have 2 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '1');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if party number is blank', () => {
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeDisabled();
    });
    it('should be disabled if register number is invalid', () => {
        // The register number should have 10 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '123456789');
        expect(button).toBeDisabled();
    });
    it('should be disabled if register number is blank', () => {
        // The register number should have 10 characters to be valid
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '');
        expect(button).toBeDisabled();
    });
    it('should be disabled all the inputs are blank', () => {
        fireEvent.changeText(nameInput, '');
        fireEvent.changeText(campaignNameInput, '');
        fireEvent.changeText(viceName, '');
        fireEvent.changeText(partyInput, '');
        fireEvent.changeText(partyNumberInput, '');
        fireEvent.changeText(registerNumberInput, '');
        expect(button).toBeDisabled();
    });
    it('should be enabled if all the inputs are valid', () => {
        fireEvent.changeText(nameInput, 'testName testLastName');
        fireEvent.changeText(campaignNameInput, 'test');
        fireEvent.changeText(viceName, 'test');
        fireEvent.changeText(partyInput, 'TEST');
        fireEvent.changeText(partyNumberInput, '12');
        fireEvent.changeText(registerNumberInput, '1234567890');
        expect(button).toBeEnabled();
    });
});

describe('Second form button', () => {
    // const nameInput = getByTestId('name-input');
    // const campaignNameInput = getByTestId('campaignName-input');
    // const viceName = getByTestId('viceName-input');
    // const partyInput = getByTestId('party-input');
    // const partyNumberInput = getByTestId('partyNumber-input');
    // const registerNumberInput = getByTestId('registerNumber-input');
    it('should be disabled if user didnt choose a photo', () => {
        // fireEvent.changeText(nameInput, 'testName testLastName');
        // fireEvent.changeText(campaignNameInput, 'test');
        // fireEvent.changeText(viceName, 'test');
        // fireEvent.changeText(partyInput, 'TEST');
        // fireEvent.changeText(partyNumberInput, '12');
        // fireEvent.changeText(registerNumberInput, '1234567890');
        // fireEvent.press(getByTestId('first-form-next-button'));
        // expect(getByText('Adicione sua foto')).toBeTruthy();
        // expect(getByTestId('second-form-next-button')).toBeDisabled();
    });
    it('should be enabled if user send the photo', () => {});
});
