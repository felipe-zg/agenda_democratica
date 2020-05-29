import React, {useState, useRef} from 'react';
import {View} from 'react-native';

import logo from '../../../assets/trump.png';
import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {LogoView, FormView, Logo, SignUpLink, Text} from './styles';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();

    const handleSignIn = () => {
        console.warn('Signing in as candidate');
    };

    return (
        <Container>
            <LogoView>
                <Logo source={logo} />
            </LogoView>
            <FormView>
                <Input
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
