import React from 'react';
import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';

import Container from '../../../components/Container';
import Text from '../../../components/Text';
// import { Container } from './styles';

const Home = () => {
    // function handlelogout() {
    //     auth()
    //         .signOut()
    //         .then(() => {
    //             Toast.show('Logou efetuado');
    //         });
    // }
    return (
        <Container>
            <Text>Voter Home screen</Text>
        </Container>
    );
};

export default Home;
