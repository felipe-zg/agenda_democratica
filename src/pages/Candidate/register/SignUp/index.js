import React, {useState, useRef, useEffect} from 'react';
import {View, Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import Container from '../../../../components/Container';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import BackButton from '../../../../components/BackButton';
import Text from '../../../../components/Text';
import {
    Form,
    AboutView,
    AboutInput,
    ImagePickerTouch,
    Photo,
    ButtonsView,
} from './styles';

import {
    isEmail,
    isPassword,
    isFullName,
    isName,
    isParty,
    isId,
    fieldsAreEqual,
    errors,
} from '../../../../utils/validations';
import {handleInputChange} from '../../../../utils/handlers';

const SignUp = ({navigation}) => {
    const [formIndex, setFormIndex] = useState(1);
    //first form
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFirstButtondisabled, setIsFirstButtonDisabled] = useState(true);
    const [firstButtonBackground, setFirstButtonBackground] = useState('#ddd');

    //first form errors
    const [emailError, setEmailError] = useState(errors.valid);
    const [confirmEmailError, setConfirmEmailError] = useState(errors.valid);
    const [passwordError, setPasswordError] = useState(errors.valid);
    const [confirmPasswordError, setConfirmPasswordError] = useState(
        errors.valid,
    );

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

    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        if (isFirstFormValid()) {
            setIsFirstButtonDisabled(false);
            setFirstButtonBackground('#00f');
        } else {
            setIsFirstButtonDisabled(true);
            setFirstButtonBackground('#ddd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, confirmEmail, password, confirmPassword]);

    useEffect(() => {
        if (isSecondFormValid()) {
            setIsSecondButtonDisabled(false);
            setSecondButtonBackground('#00f');
        } else {
            setIsSecondButtonDisabled(true);
            setSecondButtonBackground('#ddd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, campaignName, viceName, party, number, id]);

    function isFirstFormValid() {
        return (
            isEmail(email) &&
            isEmail(confirmEmail) &&
            isPassword(password) &&
            isPassword(confirmPassword)
        );
    }

    function isSecondFormValid() {
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

    function handleFirstForm() {
        if (!fieldsAreEqual(email, confirmEmail)) {
            Toast.show('Os e-mails são diferentes');
            return;
        }
        if (!fieldsAreEqual(password, confirmPassword)) {
            Toast.show('As senhas são diferentes');
            return;
        }
        setFormIndex(2);
    }

    function handleSignUp() {
        try {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    const user = auth().currentUser;
                    await user.updateProfile({
                        displayName: name,
                    });
                    let uId = user.uid;
                    database().ref('/candidates').push(getCandidate(uId));

                    Toast.show('Cadastro realizado com sucesso');
                    navigation.replace('CandidateDashboardScreen');
                })
                .catch((e) => {
                    Toast.show('Algo deu errado no cadastro :(');
                });
        } catch (e) {
            Toast.show('Algo deu errado no cadastro :(');
        }
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
                <Text>E-mail</Text>
                <Text color="#f00" size="8px">
                    {emailError.message}
                </Text>
                <Input
                    placeholder="Digite seu e-mail"
                    border={emailError.border}
                    value={email}
                    onChangeText={(email) =>
                        handleInputChange(
                            email,
                            setEmail,
                            isEmail,
                            emailError,
                            setEmailError,
                            errors.invalidEmail,
                        )
                    }
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Text>Confirme seu E-mail</Text>
                <Text color="#f00" size="8px">
                    {confirmEmailError.message}
                </Text>
                <Input
                    ref={confirmEmailRef}
                    placeholder="Confirme seu e-mail"
                    border={confirmEmailError.border}
                    value={confirmEmail}
                    onChangeText={(confirmEmail) => {
                        handleInputChange(
                            confirmEmail,
                            setConfirmEmail,
                            isEmail,
                            confirmEmailError,
                            setConfirmEmailError,
                            errors.invalidEmail,
                        );
                    }}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Text>Senha</Text>
                <Text color="#f00" size="8px">
                    {passwordError.message}
                </Text>
                <Input
                    ref={passwordRef}
                    placeholder="Digite sua senha"
                    border={passwordError.border}
                    value={password}
                    onChangeText={(password) => {
                        handleInputChange(
                            password,
                            setPassword,
                            isPassword,
                            passwordError,
                            setPasswordError,
                            errors.invalidPassword,
                        );
                    }}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
                <Text>Confirme sua senha</Text>
                <Text color="#f00" size="8px">
                    {confirmPasswordError.message}
                </Text>
                <Input
                    ref={confirmPasswordRef}
                    placeholder="Digite sua senha"
                    border={confirmPasswordError.border}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => {
                        handleInputChange(
                            confirmPassword,
                            setConfirmPassword,
                            isPassword,
                            confirmPasswordError,
                            setConfirmPasswordError,
                            errors.invalidPassword,
                        );
                    }}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => handleFirstForm()}
                />
                <Button
                    title="Próximo"
                    disabled={isFirstButtondisabled}
                    background={firstButtonBackground}
                    callback={() => handleFirstForm()}
                />
            </>
        );
    }

    function secondForm() {
        return (
            <>
                {nameError === errors.valid && <Text>Nome completo</Text>}
                {nameError === errors.invalidFullName && (
                    <Text color="#f00" size="8px">
                        {nameError.message}
                    </Text>
                )}
                <Input
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
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
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
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />

                {viceNameError === errors.valid && <Text>Nome do vice</Text>}
                {viceNameError === errors.invalidName && (
                    <Text color="#f00" size="8px">
                        {viceNameError.message}
                    </Text>
                )}
                <Input
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
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />

                {partyError === errors.valid && <Text>Sigla do partido</Text>}
                {partyError === errors.invalidParty && (
                    <Text color="#f00" size="8px">
                        {partyError.message}
                    </Text>
                )}
                <Input
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
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
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
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />

                {idError === errors.valid && <Text>Número do candidato</Text>}
                {idError === errors.invalidId && (
                    <Text color="#f00" size="8px">
                        {idError.message}
                    </Text>
                )}
                <Input
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
                    returnKeyType="send"
                    onSubmitEditing={() => setFormIndex(3)}
                />

                <Button
                    title="Próximo"
                    disabled={isSecondButtondisabled}
                    background={secondButtonBackground}
                    callback={() => setFormIndex(3)}
                />
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(1)}
                />
            </>
        );
    }

    function thirdForm() {
        return (
            <>
                <ImagePickerTouch onPress={() => handleImagePicker()}>
                    {photo == null && <Text>Adicione sua foto</Text>}
                    {photo && <Photo source={{uri: photo.uri}} />}
                </ImagePickerTouch>
                <ButtonsView>
                    <Button
                        title="Próximo"
                        disabled={photo == null ? true : false}
                        background={photo == null ? '#ddd' : '#00f'}
                        callback={() => setFormIndex(4)}
                    />
                    <Button
                        title="Voltar"
                        background="#ddd"
                        callback={() => setFormIndex(2)}
                    />
                </ButtonsView>
            </>
        );
    }

    function fourthForm() {
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
                    onSubmitEditing={handleSignUp}
                />
                <Button title="Próximo" callback={() => handleSignUp()} />
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(3)}
                />
            </AboutView>
        );
    }

    return (
        <Container>
            <BackButton title="Login" action={() => navigation.goBack()} />
            {formIndex !== 3 && (
                <Form>
                    {formIndex === 1 && firstForm()}
                    {formIndex === 2 && secondForm()}
                    {formIndex === 4 && fourthForm()}
                </Form>
            )}
            {formIndex === 3 && thirdForm()}
        </Container>
    );
};

export default SignUp;
