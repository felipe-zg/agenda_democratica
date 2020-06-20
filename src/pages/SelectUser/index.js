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
                            userType: 'candidate',
                        });
                    }}
                />
                <Button
                    title="Sou Eleitor"
                    Icon={Icon}
                    iconName="user"
                    iconColor="#fff"
                    callBack={() => {
                        navigation.navigate('SignInScreen', {
                            userType: 'voter',
                        });
                    }}
                />
            </MenuView>
        </Container>
    );
};

export default SelectUser;
