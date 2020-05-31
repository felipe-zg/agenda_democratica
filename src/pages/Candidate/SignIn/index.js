import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

import logo from '../../../assets/trump.png';
import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {LogoView, FormView, Logo, SignUpLink, Text} from './styles';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();

    const formref = useRef();

    const handleSignIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.warn('login efetuado com sucesso');
                navigation.navigate('CandidateDashboardScreen');
            })
            .catch((e) => {
                console.warn(e);
            });
    };

    return (
        <Container>
            <LogoView>
                <Logo source={logo} />
            </LogoView>
            <FormView>
                <Input
                    name="email"
                    label="email"
                    validators={['required', 'isEmail']}
                    errorMessages={[
                        'This field is required',
                        'e-mail inválido',
                    ]}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Input
                    ref={passwordRef}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => handleSignIn()}
                />
                <Button title="Entrar" callback={handleSignIn} />
                <SignUpLink
                    onPress={() =>
                        navigation.navigate('CandidateSignUpScreen')
                    }>
                    <Text>Cadastre-se</Text>
                </SignUpLink>
            </FormView>
        </Container>
    );
};

export default SignIn;
