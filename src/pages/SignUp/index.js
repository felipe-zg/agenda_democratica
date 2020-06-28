import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import loadAnimation from '../../assets/animations/load.json';

import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import Text from '../../components/Text';
import PasswordView from '../../components/PasswordView';
import {Form, RadioButtonView} from './styles';

import {
    isEmail,
    isPassword,
    fieldsAreEqual,
    errors,
} from '../../utils/validations';
import {handleInputChange} from '../../utils/handlers';

const SignUp = ({route, navigation}) => {
    //form
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFirstButtondisabled, setIsFirstButtonDisabled] = useState(true);
    const [firstButtonBackground, setFirstButtonBackground] = useState('#ddd');
    const [office, setOffice] = useState('mayor');

    //first form errors
    const [emailError, setEmailError] = useState(errors.valid);
    const [confirmEmailError, setConfirmEmailError] = useState(errors.valid);
    const [passwordError, setPasswordError] = useState(errors.valid);
    const [confirmPasswordError, setConfirmPasswordError] = useState(
        errors.valid,
    );

    const [isLoading, setIsLoading] = useState(false);
    const [iconName, setIconName] = useState('eye-outline');
    const [isSecure, setIsSecure] = useState(true);

    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        if (isFormValid()) {
            setIsFirstButtonDisabled(false);
            setFirstButtonBackground('#00f');
        } else {
            setIsFirstButtonDisabled(true);
            setFirstButtonBackground('#ddd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, confirmEmail, password, confirmPassword]);

    const {userType} = route.params;

    function isFormValid() {
        return (
            isEmail(email) &&
            isEmail(confirmEmail) &&
            isPassword(password) &&
            isPassword(confirmPassword)
        );
    }

    function handleSubmit() {
        if (!fieldsAreEqual(email, confirmEmail)) {
            Toast.show('Os e-mails são diferentes');
            return;
        }
        if (!fieldsAreEqual(password, confirmPassword)) {
            Toast.show('As senhas são diferentes');
            return;
        }
        handleSignUp();
    }

    function handleSignUp() {
        try {
            setIsLoading(true);
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    Toast.show('Cadastro realizado com sucesso');
                    setIsLoading(false);
                    if (userType === 'candidate') {
                        saveUser(office);
                        navigation.replace('MayorRegisterScreen', {office});
                    } else {
                        saveUser(userType);
                        navigation.replace('VoterRegisterScreen');
                    }
                })
                .catch((e) => {
                    Toast.show('Algo deu errado no cadastro :(');
                });
        } catch (e) {
            setIsLoading(false);
            Toast.show('Algo deu errado no cadastro :(');
        }
    }

    async function saveUser(type) {
        await database().ref(`/users/${auth().currentUser.uid}`).set(type);
    }

    function togglePassword() {
        setIconName(
            iconName === 'eye-outline' ? 'eye-off-outline' : 'eye-outline',
        );
        setIsSecure(!isSecure);
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
            <BackButton title="Login" action={() => navigation.goBack()} />
            <Form>
                <Text>E-mail</Text>
                <Text
                    testID="email-input-error-message"
                    color="#f00"
                    size="8px">
                    {emailError.message}
                </Text>
                <Input
                    testID="email-input"
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
                <Text
                    testID="confirmEmail-input-error-message"
                    color="#f00"
                    size="8px">
                    {confirmEmailError.message}
                </Text>
                <Input
                    testID="confirmEmail-input"
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
                <Text
                    testID="password-input-error-message"
                    color="#f00"
                    size="8px">
                    {passwordError.message}
                </Text>
                <PasswordView border={passwordError.border}>
                    <Input
                        testID="password-input"
                        ref={passwordRef}
                        width="90%"
                        marginBottom="0"
                        secureTextEntry={isSecure}
                        placeholder="Digite sua senha"
                        border="none"
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
                        autoCapitalize="none"
                        returnKeyType="send"
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                    />
                    <TouchableOpacity onPress={() => togglePassword()}>
                        <Icon name={iconName} color="#fff" size={30} />
                    </TouchableOpacity>
                </PasswordView>
                <Text>Confirme sua senha</Text>
                <Text
                    testID="confirmPassword-input-error-message"
                    color="#f00"
                    size="8px">
                    {confirmPasswordError.message}
                </Text>
                <Input
                    testID="confirmPassword-input"
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
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmit()}
                />
                {userType === 'candidate' && (
                    <View>
                        <RadioButtonView>
                            <RadioButton
                                value="mayor"
                                status={
                                    office === 'mayor' ? 'checked' : 'unchecked'
                                }
                                uncheckedColor="#fff"
                                onPress={() => setOffice('mayor')}
                            />
                            <Text>Sou candidato a prefeito</Text>
                        </RadioButtonView>
                        <RadioButtonView>
                            <RadioButton
                                value="cityCouncilor"
                                status={
                                    office === 'cityCouncilor'
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                uncheckedColor="#fff"
                                onPress={() => setOffice('cityCouncilor')}
                            />
                            <Text>Sou candidato a vereador</Text>
                        </RadioButtonView>
                    </View>
                )}
                <Button
                    testID="signUp-button"
                    title="Próximo"
                    disabled={isFirstButtondisabled}
                    background={firstButtonBackground}
                    callback={() => handleSubmit()}
                />
            </Form>
        </Container>
    );
};

export default SignUp;
