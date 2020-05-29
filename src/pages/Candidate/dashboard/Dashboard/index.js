import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Container from '../../../../components/Container';
import Button from '../../../../components/MenuButton';
// import { Container } from './styles';

const Dashboard = ({navigation}) => {
    return (
        <Container>
            <Button
                title="Novo evento"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    console.warn('Novo evento');
                }}
            />
            <Button
                title="Meus eventos"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    console.warn('Meus eventos');
                }}
            />
            <Button
                title="Meu Perfil"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    console.warn('Meu perfil');
                }}
            />
            <Button
                title="Plano de governo"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    console.warn('Plano de governo');
                }}
            />
        </Container>
    );
};

export default Dashboard;
