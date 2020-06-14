import React, {useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-simple-toast';

import loadAnimation from '../../../../assets/animations/load.json';

import {clearAddressesList} from '../../../../store/modules/Address/actions';
import {clearEventsList} from '../../../../store/modules/Event/actions';

import Container from '../../../../components/Container';
import Button from '../../../../components/MenuButton';
import BackButton from '../../../../components/BackButton';
// import { Container } from './styles';

const Dashboard = ({navigation}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsloading] = useState(false);

    function handleSignOut() {
        try {
            setIsloading(true);
            auth()
                .signOut()
                .then(() => {
                    dispatch(clearAddressesList());
                    dispatch(clearEventsList());
                    setIsloading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'LoadScreen'}],
                    });
                });
        } catch (e) {
            Toast.show('Erro ao tentar fazer logout');
            setIsloading(false);
        }
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
            <BackButton action={() => navigation.goBack()} title="Posts" />
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
                    navigation.navigate('CandidateEventsListScreen');
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
                    navigation.navigate('CandidateAddressesListScreen');
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
                    navigation.navigate('CandidateGovernmentPlanScreen');
                }}
            />
            <Button
                title="Sair"
                Icon={Icon}
                iconName="user"
                iconColor="#f00"
                callBack={() => handleSignOut()}
            />
        </Container>
    );
};

export default Dashboard;
