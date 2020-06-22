import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';

import {startCandidate} from '../../../../store/modules/Candidate/actions';

import loadAnimation from '../../../../assets/animations/load.json';

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

import * as validations from '../../../../utils/validations';
import * as regex from '../../../../utils/regexes';
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
    const [isLoading, setIsLoading] = useState(false);

    //second for errors
    const [nameError, setNameError] = useState(validations.errors.valid);
    const [campaignNameError, setCampaignNameError] = useState(
        validations.errors.valid,
    );
    const [viceNameError, setViceNameError] = useState(
        validations.errors.valid,
    );
    const [partyError, setPartyError] = useState(validations.errors.valid);
    const [numberError, setNumberError] = useState(validations.errors.valid);
    const [idError, setIdError] = useState(validations.errors.valid);

    //third and fourth forms
    const [photo, setPhoto] = useState(null);
    const [about, setAbout] = useState('');

    const dispatch = useDispatch();

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
        try {
            setIsLoading(true);
            const user = auth().currentUser;
            await persistPhoto(user.uid, photo.path);
            const downloadUrl = await getPhotoDownloadUrl(user.uid);
            await user.updateProfile({
                displayName: name,
                photoURL: downloadUrl,
            });
            const ref = database().ref('/candidates/mayor');
            const key = ref.push().key;
            const candidate = getCandidate(user.uid, key, downloadUrl);
            ref.child(key).set(candidate);
            Toast.show('Bem-vindo(a) ao agenda democrática');
            setIsLoading(false);
            dispatch(startCandidate(candidate));
            navigation.replace('CandidatePostsScreen');
        } catch (e) {
            setIsLoading(false);
            Toast.show('Algo deu errado');
        }
    }

    function isFirstFormValid() {
        return (
            validations.isFullName(name) &&
            validations.isName(campaignName) &&
            validations.isName(viceName) &&
            validations.isParty(party) &&
            validations.isParty(number) &&
            validations.isId(id)
        );
    }

    function getCandidate(uId, key, photo) {
        return {
            name: name.trim(),
            campaignName: campaignName.trim(),
            viceName: viceName.trim(),
            party: party.trim(),
            number: number.trim(),
            id: id.trim(),
            about: about.trim(),
            uId,
            candidateKey: key,
            photo,
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
                {nameError === validations.errors.valid && (
                    <Text>Nome completo</Text>
                )}
                {nameError === validations.errors.invalidFullName && (
                    <Text color="#f00" size="8px">
                        {nameError.message}
                    </Text>
                )}
                <Input
                    testID="name-input"
                    placeholder="Nome completo do candidato"
                    border={nameError.border}
                    value={regex.removeUnnecessaryBlankSpaces(name)}
                    onChangeText={(name) => {
                        handleInputChange(
                            name,
                            setName,
                            validations.isFullName,
                            nameError,
                            setNameError,
                            validations.errors.invalidFullName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {campaignNameError === validations.errors.valid && (
                    <Text>Nome de campanha</Text>
                )}
                {campaignNameError === validations.errors.invalidName && (
                    <Text color="#f00" size="8px">
                        {campaignNameError.message}
                    </Text>
                )}
                <Input
                    testID="campaignName-input"
                    placeholder="Nome de campanha do candidato"
                    border={campaignNameError.border}
                    value={regex.removeUnnecessaryBlankSpaces(campaignName)}
                    onChangeText={(campaignName) => {
                        handleInputChange(
                            campaignName,
                            setCampaignName,
                            validations.isName,
                            campaignNameError,
                            setCampaignNameError,
                            validations.errors.invalidName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {viceNameError === validations.errors.valid && (
                    <Text>Nome do vice</Text>
                )}
                {viceNameError === validations.errors.invalidName && (
                    <Text color="#f00" size="8px">
                        {viceNameError.message}
                    </Text>
                )}
                <Input
                    testID="viceName-input"
                    placeholder="Nome do vice"
                    border={viceNameError.border}
                    value={regex.removeUnnecessaryBlankSpaces(viceName)}
                    onChangeText={(viceName) => {
                        handleInputChange(
                            viceName,
                            setViceName,
                            validations.isName,
                            viceNameError,
                            setViceNameError,
                            validations.errors.invalidName,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {partyError === validations.errors.valid && (
                    <Text>Sigla do partido</Text>
                )}
                {partyError === validations.errors.invalidParty && (
                    <Text color="#f00" size="8px">
                        {partyError.message}
                    </Text>
                )}
                <Input
                    testID="party-input"
                    placeholder="Partido do candidato"
                    border={partyError.border}
                    value={regex.removeAllBlankSpaces(party)}
                    onChangeText={(party) => {
                        handleInputChange(
                            party,
                            setParty,
                            validations.isParty,
                            partyError,
                            setPartyError,
                            validations.errors.invalidParty,
                        );
                    }}
                    autoCorrect={false}
                    autoCapitalize="words"
                />

                {numberError === validations.errors.valid && (
                    <Text>Número do candidato</Text>
                )}
                {numberError === validations.errors.invalidNumber && (
                    <Text color="#f00" size="8px">
                        {numberError.message}
                    </Text>
                )}
                <Input
                    testID="partyNumber-input"
                    placeholder="Número do candidato"
                    border={numberError.border}
                    maxLength={2}
                    value={regex.removeAllBlankSpaces(number)}
                    onChangeText={(number) => {
                        handleInputChange(
                            number,
                            setNumber,
                            validations.isParty,
                            numberError,
                            setNumberError,
                            validations.errors.invalidNumber,
                        );
                    }}
                    keyboardType="numeric"
                    autoCorrect={false}
                />

                {idError === validations.errors.valid && (
                    <Text>Número de registro</Text>
                )}
                {idError === validations.errors.invalidId && (
                    <Text color="#f00" size="8px">
                        {idError.message}
                    </Text>
                )}
                <Input
                    testID="registerNumber-input"
                    placeholder="Nº registro da candidatura (TSE)"
                    border={idError.border}
                    value={regex.removeAllBlankSpaces(id)}
                    onChangeText={(id) => {
                        handleInputChange(
                            id,
                            setId,
                            validations.isId,
                            idError,
                            setIdError,
                            validations.errors.invalidId,
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
                    value={about.replace(/( )+/g, ' ')}
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

    if (isLoading) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
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
