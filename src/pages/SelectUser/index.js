import React from 'react';
import {} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import logo from '../../assets/logo_brasil.jpg';

import Container from '../../components/Container';
import Button from '../../components/MenuButton';

import {LogoView, MenuView, Logo} from './styles';

const SelectUser = ({navigation}) => {
    return (
        <Container>
            <LogoView>
                <Logo source={logo} />
            </LogoView>
            <MenuView>
                <Button
                    title="Sou candidato"
                    Icon={Icon}
                    iconName="user"
                    iconColor="#fff"
                    callBack={() => {
                        navigation.navigate('SignInScreen', {
                            signUpScreen: 'CandidateSignUpScreen',
                        });
                    }}
                />
                <Button
                    title="Sou eleitor"
                    Icon={Icon}
                    iconName="user"
                    iconColor="#fff"
                    ccallBack={() => {
                        navigation.navigate('SignInScreen', {
                            signUpScren: 'VoterSignUpScreen',
                        });
                    }}
                />
            </MenuView>
        </Container>
    );
};

export default SelectUser;
