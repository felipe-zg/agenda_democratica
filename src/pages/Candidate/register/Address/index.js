import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';
import Geocoder from 'react-native-geocoding';
import {MAPS_API_KEY} from 'react-native-dotenv';

import loadAnimation from '../../../../assets/animations/load.json';

import {addAddress} from '../../../../store/modules/Address/actions';

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
    const [isLoading, setIsLoading] = useState(false);

    const dispacth = useDispatch();

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

    function getAddress(addressKey, latitude, longitude) {
        return {
            street,
            county,
            number,
            city,
            cep,
            addressKey,
            latitude,
            longitude,
        };
    }

    async function getGeolocation() {
        const mapsAddres = `${street}, ${number}, ${county}, - ${city}, Rio De Janeiro`;
        Geocoder.init(MAPS_API_KEY);
        var geolocation = null;
        await Geocoder.from(mapsAddres)
            .then((json) => {
                var location = json.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                console.warn(latitude);
                console.warn(longitude);
                geolocation = {
                    latitude,
                    longitude,
                };
            })
            .catch((e) => {
                console.warn(e);
            });
        return geolocation;
    }

    async function handleRegister() {
        try {
            setIsLoading(true);
            const user = auth().currentUser;
            const ref = database().ref(`/addresses/${user.uid}`);
            const addressKey = ref.push().key;
            const geolocatedAddress = await getGeolocation();
            const address = getAddress(
                addressKey,
                geolocatedAddress.latitude,
                geolocatedAddress.longitude,
            );
            await ref.child(addressKey).set(address);
            dispacth(addAddress(address));
            Toast.show('Endereço cadastrado com sucesso');
            setIsLoading(false);
            navigation.replace('CandidateAddressesListScreen');
        } catch (e) {
            setIsLoading(false);
            console.warn(e);
            Toast.show('Erro ao cadastrar endereço');
        }
    }

    if (isLoading) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
        );
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="dashboard" />
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
