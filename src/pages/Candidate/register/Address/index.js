import React, {useState, useEffect, isValidElement} from 'react';

import {isCep, errors} from '../../../../utils/validations';
import {handleInputChange} from '../../../../utils/handlers';

import Container from '../../../../components/Container';
import BackButton from '../../../../components/BackButton';
import Input from '../../../../components/Input';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';

const Address = ({navigation}) => {
    const [street, setStreet] = useState('');
    const [county, setCounty] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [cep, setCep] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonBackground, setButtonBackground] = useState('#ddd');
    const [cepError, setCepError] = useState(errors.valid);

    useEffect(() => {
        if (!formHasEmptyInput() && isCep(cep)) {
            if (isButtonDisabled) {
                setIsButtonDisabled(false);
                setButtonBackground('#00f');
            }
        } else {
            if (!isButtonDisabled) {
                setIsButtonDisabled(true);
                setButtonBackground('#ddd');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [street, county, number, city, cep]);

    function formHasEmptyInput() {
        return (
            street === '' ||
            county === '' ||
            number === '' ||
            city === '' ||
            cep === ''
        );
    }

    function handleRegister() {
        console.warn('registrando endereço');
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} />
            <Form>
                <Text>Rua</Text>
                <Input
                    testID="street-input"
                    autoCapitalize="words"
                    value={street}
                    onChangeText={setStreet}
                />
                <Text>Bairro</Text>
                <Input
                    testID="county-input"
                    autoCapitalize="words"
                    value={county}
                    onChangeText={setCounty}
                />
                <Text>Número</Text>
                <Input
                    testID="number-input"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={number}
                    onChangeText={setNumber}
                />
                <Text>Cidade</Text>
                <Input
                    testID="city-input"
                    autoCapitalize="words"
                    value={city}
                    onChangeText={setCity}
                />
                {cepError === errors.valid && <Text>CEP</Text>}
                {cepError === errors.invalidCep && (
                    <Text color="#f00" size="8px">
                        {cepError.message}
                    </Text>
                )}
                <Input
                    testID="CEP-input"
                    keyboardType="number-pad"
                    maxLength={8}
                    border={cepError.border}
                    value={cep}
                    onChangeText={(cep) => {
                        handleInputChange(
                            cep,
                            setCep,
                            isCep,
                            cepError,
                            setCepError,
                            errors.invalidCep,
                        );
                    }}
                />
                <Button
                    testID="register-button"
                    title="Próximo"
                    background={buttonBackground}
                    disabled={isButtonDisabled}
                    callback={handleRegister}
                />
            </Form>
        </Container>
    );
};

export default Address;
