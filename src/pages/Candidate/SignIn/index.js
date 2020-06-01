import React, {useState, useRef, useEffect} from 'react';
import {View, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import logo from '../../../assets/trump.png';
import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import {LogoView, FormView, Logo, SignUpLink} from './styles';

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isPasswordValid = (password) => {
    return password.length >= 6;
};

const errors = {
    invalidEmail: {
        border: '1px solid #f00',
        message: 'E-mail inválido',
    },
    invalidPassword: {
        border: '1px solid #f00',
        message: 'Minimo de 6 caracteres',
    },
    valid: {
        border: 'none',
        message: '',
    },
};

const handleInputChange = (
    value,
    setInputValue,
    validator,
    currentState,
    setError,
    invalidState,
) => {
    if (validator(value) && currentState === invalidState) {
        setError(errors.valid);
    } else if (!validator(value) && currentState === errors.valid) {
        setError(invalidState);
    }
    setInputValue(value);
};

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(errors.valid);
    const [passwordError, setPasswordError] = useState(errors.valid);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonColor, setButtonColor] = useState('#0ff');

    const passwordRef = useRef();

    useEffect(() => {
        if (isEmailValid(email) && isPasswordValid(password)) {
            setIsButtonDisabled(false);
            setButtonColor('#00f');
        } else {
            setIsButtonDisabled(true);
            setButtonColor('#ddd');
        }
    }, [email, password]);

    const handleSignIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Toast.show('login efetuado com sucesso');
                navigation.navigate('CandidateDashboardScreen');
            })
            .catch((e) => {
                Toast.show('E-mail ou senha incorretos');
            });
    };

    return (
        <Container>
            <LogoView>
                <Logo source={logo} />
            </LogoView>
            <FormView>
                <Text>E-mail:</Text>
                <Text color="#f00" size="8px">
                    {emailError.message}
                </Text>
                <Input
                    name="email"
                    label="email"
                    validators={['required', 'isEmail']}
                    errorMessages={[
                        'This field is required',
                        'e-mail inválido',
                    ]}
                    placeholder="Digite seu e-mail"
                    border={emailError.border}
                    value={email}
                    onChangeText={(email) =>
                        handleInputChange(
                            email,
                            setEmail,
                            isEmailValid,
                            emailError,
                            setEmailError,
                            errors.invalidEmail,
                        )
                    }
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Text>Senha:</Text>
                <Text color="#f00" size="8px">
                    {passwordError.message}
                </Text>
                <Input
                    ref={passwordRef}
                    placeholder="Digite sua senha"
                    border={passwordError.border}
                    value={password}
                    onChangeText={(password) =>
                        handleInputChange(
                            password,
                            setPassword,
                            isPasswordValid,
                            passwordError,
                            setPasswordError,
                            errors.invalidPassword,
                        )
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => handleSignIn()}
                />
                <Button
                    title="Entrar"
                    background={buttonColor}
                    disabled={isButtonDisabled}
                    callback={handleSignIn}
                />
                <SignUpLink
                    onPress={() =>
                        navigation.navigate('CandidateSignUpScreen')
                    }>
                    <Text size="10px">Cadastre-se</Text>
                </SignUpLink>
            </FormView>
        </Container>
    );
};

export default SignIn;
