import React, {useState, useRef, useEffect} from 'react';
import {View, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';

// import logo from '../../../assets/trump.png';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
import {LogoView, FormView, Logo, SignUpLink} from './styles';

import {isEmail, isPassword, errors} from '../../utils/validations';
import {handleInputChange} from '../../utils/handlers';

const SignIn = ({route, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(errors.valid);
    const [passwordError, setPasswordError] = useState(errors.valid);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonColor, setButtonColor] = useState('#0ff');
    const [isLoading, setIsLoading] = useState(false);
    const passwordRef = useRef();

    useEffect(() => {
        if (isEmail(email) && isPassword(password)) {
            setIsButtonDisabled(false);
            setButtonColor('#00f');
        } else {
            setIsButtonDisabled(true);
            setButtonColor('#ddd');
        }
    }, [email, password]);

    // RECEBER O PROPRIEDADE DE TELA DE CADASTRO E PASSÁ-LA PARA O LINK DE CADASTRO SEM O ID
    // ERRO DO JEST DIZENDO QUE ROUTE ERA NULL
    var signUpScreenToGo = '';
    if (route) {
        const {signUpScreen} = route.params;
        signUpScreenToGo = signUpScreen;
    }

    function cleanInputs() {
        setEmail('');
        setPassword('');
    }

    function handleSignIn() {
        setIsLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                cleanInputs();
                navigation.reset({
                    index: 0,
                    routes: [{name: 'LoadScreen'}],
                });
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                Toast.show('E-mail ou senha incorretos');
            });
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
            {/*<LogoView>
                <Logo source={logo} />
            </LogoView>*/}
            <FormView>
                <Text>E-mail:</Text>
                <Text
                    color="#f00"
                    size="8px"
                    testID="email-input-error-message">
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
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Text>Senha:</Text>
                <Text
                    color="#f00"
                    size="8px"
                    testID="password-input-error-message">
                    {passwordError.message}
                </Text>
                <Input
                    testID="password-input"
                    ref={passwordRef}
                    placeholder="Digite sua senha"
                    border={passwordError.border}
                    value={password}
                    onChangeText={(password) =>
                        handleInputChange(
                            password,
                            setPassword,
                            isPassword,
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
                    testID="signIn-button"
                    title="Entrar"
                    background={buttonColor}
                    disabled={isButtonDisabled}
                    callback={handleSignIn}
                />
                <SignUpLink
                    onPress={() => navigation.navigate(signUpScreenToGo)}>
                    <Text size="10px">Cadastre-se</Text>
                </SignUpLink>
            </FormView>
        </Container>
    );
};

export default SignIn;
