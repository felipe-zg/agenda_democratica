import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

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
                    navigation.navigate('CandidateEventRegisterScreen');
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
                title="Novo endereço"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    navigation.navigate('CandidateAddressRegisterScreen');
                }}
            />
            <Button
                title="Meus endereços"
                Icon={Icon}
                iconName="user"
                iconColor="#fff"
                callBack={() => {
                    console.warn('Meus endereços');
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
            <Button
                title="Sair"
                Icon={Icon}
                iconName="user"
                iconColor="#f00"
                callBack={() => {
                    auth()
                        .signOut()
                        .then(() => navigation.replace('SelectUserScreen'));
                }}
            />
        </Container>
    );
};

export default Dashboard;
