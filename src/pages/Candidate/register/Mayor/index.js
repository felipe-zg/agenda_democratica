import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import Container from '../../../../components/Container';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';

import {
    Form,
    ImagePickerTouch,
    ButtonsView,
    AboutView,
    AboutInput,
    Photo,
} from './styles';

import {
    isFullName,
    isName,
    isParty,
    isId,
    errors,
} from '../../../../utils/validations';
import {handleInputChange} from '../../../../utils/handlers';

async function persistPhoto(uId, filePath) {
    const storageRef = storage().ref('profile');
    const endPath = storageRef.child(uId + '/profilePhoto.jpg');
    await endPath.putFile(filePath);
}

async function getPhotoDownloadUrl(uId) {
    const storageRef = storage().ref('profile/' + uId + '/profilePhoto.jpg');
    try {
        const url = await storageRef.getDownloadURL();
        return url;
    } catch (err) {
        console.log(err);
    }
}

const Mayor = ({navigation}) => {
    //second form
    const [name, setName] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [viceName, setViceName] = useState('');
    const [party, setParty] = useState('');
    const [number, setNumber] = useState('');
    const [id, setId] = useState('');
    const [isSecondButtondisabled, setIsSecondButtonDisabled] = useState(true);
    const [secondButtonBackground, setSecondButtonBackground] = useState(
        '#ddd',
    );
    const [formIndex, setFormIndex] = useState(1);

    //second for errors
    const [nameError, setNameError] = useState(errors.valid);
    const [campaignNameError, setCampaignNameError] = useState(errors.valid);
    const [viceNameError, setViceNameError] = useState(errors.valid);
    const [partyError, setPartyError] = useState(errors.valid);
    const [numberError, setNumberError] = useState(errors.valid);
    const [idError, setIdError] = useState(errors.valid);

    //third and fourth forms
    const [photo, setPhoto] = useState(null);
    const [about, setAbout] = useState('');

    useEffect(() => {
        if (isFirstFormValid()) {
            setIsSecondButtonDisabled(false);
            setSecondButtonBackground('#00f');
        } else {
            setIsSecondButtonDisabled(true);
            setSecondButtonBackground('#ddd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, campaignName, viceName, party, number, id]);

    async function handleRegister() {
        const user = auth().currentUser;
        await persistPhoto(user.uid, photo.path);
        const downloadUrl = await getPhotoDownloadUrl(user.uid);
        await user.updateProfile({
            displayName: name,
            photoURL: downloadUrl,
        });
        database().ref('/candidates').push(getCandidate(user.uId));
        navigation.replace('CandidateDashboardScreen');
    }

    function isFirstFormValid() {
        return (
            isFullName(name) &&
            isName(campaignName) &&
            isName(viceName) &&
            isParty(party) &&
            isParty(number) &&
            isId(id)
        );
    }

    function getCandidate(uId) {
        return {
            name,
            campaignName,
            party,
            number,
            id,
            about,
            uId,
        };
    }

    function handleImagePicker() {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                let source = response;
                setPhoto(source);
                return;
            } else {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    return;
                }
                if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    return;
                }
            }
        });
    }

    function firstForm() {
        return (
            <>
                {nameError === errors.valid && <Text>Nome completo</Text>}
                {nameError === errors.invalidFullName && (
                    <Text color="#f00" size="8px">
                        {nameError.message}
                    </Text>
                )}
                <Input
                    testID="name-input"
                    placeholder="Nome completo do candidato"
                    border={nameError.border}
                    value={name}
                    onChangeText={(name) => {
                        handleInputChange(
                            name,
                            setName,
                            isFullName,
                            nameError,
                            setNameError,
                            errors.invalidFullName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {campaignNameError === errors.valid && (
                    <Text>Nome de campanha</Text>
                )}
                {campaignNameError === errors.invalidName && (
                    <Text color="#f00" size="8px">
                        {campaignNameError.message}
                    </Text>
                )}
                <Input
                    testID="campaignName-input"
                    placeholder="Nome de campanha do candidato"
                    border={campaignNameError.border}
                    value={campaignName}
                    onChangeText={(campaignName) => {
                        handleInputChange(
                            campaignName,
                            setCampaignName,
                            isName,
                            campaignNameError,
                            setCampaignNameError,
                            errors.invalidName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {viceNameError === errors.valid && <Text>Nome do vice</Text>}
                {viceNameError === errors.invalidName && (
                    <Text color="#f00" size="8px">
                        {viceNameError.message}
                    </Text>
                )}
                <Input
                    testID="viceName-input"
                    placeholder="Nome do vice"
                    border={viceNameError.border}
                    value={viceName}
                    onChangeText={(viceName) => {
                        handleInputChange(
                            viceName,
                            setViceName,
                            isName,
                            viceNameError,
                            setViceNameError,
                            errors.invalidName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {partyError === errors.valid && <Text>Sigla do partido</Text>}
                {partyError === errors.invalidParty && (
                    <Text color="#f00" size="8px">
                        {partyError.message}
                    </Text>
                )}
                <Input
                    testID="party-input"
                    placeholder="Partido do candidato"
                    border={partyError.border}
                    value={party}
                    onChangeText={(party) => {
                        handleInputChange(
                            party,
                            setParty,
                            isParty,
                            partyError,
                            setPartyError,
                            errors.invalidParty,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {numberError === errors.valid && (
                    <Text>Número do candidato</Text>
                )}
                {numberError === errors.invalidNumber && (
                    <Text color="#f00" size="8px">
                        {numberError.message}
                    </Text>
                )}
                <Input
                    testID="partyNumber-input"
                    placeholder="Número do candidato"
                    border={numberError.border}
                    maxLength={2}
                    value={number}
                    onChangeText={(number) => {
                        handleInputChange(
                            number,
                            setNumber,
                            isParty,
                            numberError,
                            setNumberError,
                            errors.invalidNumber,
                        );
                    }}
                    keyboardType="numeric"
                    autoCorrect={false}
                />

                {idError === errors.valid && <Text>Número de registro</Text>}
                {idError === errors.invalidId && (
                    <Text color="#f00" size="8px">
                        {idError.message}
                    </Text>
                )}
                <Input
                    testID="registerNumber-input"
                    placeholder="Nº registro da candidatura (TSE)"
                    border={idError.border}
                    value={id}
                    onChangeText={(id) => {
                        handleInputChange(
                            id,
                            setId,
                            isId,
                            idError,
                            setIdError,
                            errors.invalidId,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                <Button
                    testID="first-form-next-button"
                    title="Próximo"
                    disabled={isSecondButtondisabled}
                    background={secondButtonBackground}
                    callback={() => setFormIndex(2)}
                />
            </>
        );
    }

    function secondForm() {
        return (
            <>
                <ImagePickerTouch onPress={() => handleImagePicker()}>
                    {photo == null && <Text>Adicione sua foto</Text>}
                    {photo && (
                        <Photo testID="photo" source={{uri: photo.uri}} />
                    )}
                </ImagePickerTouch>
                <ButtonsView>
                    <Button
                        testID="second-form-next-button"
                        title="Próximo"
                        disabled={photo == null ? true : false}
                        background={photo == null ? '#ddd' : '#00f'}
                        callback={() => setFormIndex(3)}
                    />
                    <Button
                        title="Voltar"
                        background="#ddd"
                        callback={() => setFormIndex(1)}
                    />
                </ButtonsView>
            </>
        );
    }

    function thirdForm() {
        return (
            <AboutView>
                <AboutInput
                    multiline={true}
                    numberOfLines={20}
                    maxLength={600}
                    placeholder="Sobre o candidato"
                    value={about}
                    onChangeText={setAbout}
                    returnKeyType="send"
                    onSubmitEditing={() => handleRegister}
                />
                <Button title="Próximo" callback={() => handleRegister()} />
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(2)}
                />
            </AboutView>
        );
    }

    if (formIndex == 2) {
        return <Container>{secondForm()}</Container>;
    } else {
        return (
            <Container>
                <Form>
                    {formIndex === 1 && firstForm()}
                    {formIndex === 3 && thirdForm()}
                </Form>
            </Container>
        );
    }
};

export default Mayor;
