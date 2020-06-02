import React, {useState, useRef, useEffect} from 'react';
import {View, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import logo from '../../../assets/trump.png';
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

    const {signUpScreen} = route.params;

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
                <Text color="#f00" size="8px">
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
                    testId="signin-button"
                    title="Entrar"
                    background={buttonColor}
                    disabled={isButtonDisabled}
                    callback={handleSignIn}
                />
                <SignUpLink onPress={() => navigation.navigate(signUpScreen)}>
                    <Text size="10px">Cadastre-se</Text>
                </SignUpLink>
            </FormView>
        </Container>
    );
};

export default SignIn;
