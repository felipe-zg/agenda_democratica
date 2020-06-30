import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';
import Container from '../../components/Container';

// import { Container } from './styles';

const VerifyUser = ({navigation}) => {
    useEffect(() => {
        // auth().signOut();
        async function start() {
            // auth().signOut();
            const user = auth().currentUser;
            var screen = 'SelectUserScreen';
            var userType = '';
            if (user) {
                await database()
                    .ref('/users/')
                    .child(user.uid)
                    .once('value')
                    .then(function (snapshot) {
                        userType = snapshot.val();
                    });
                if (userType === 'mayor' || userType === 'cityCouncilor') {
                    screen = 'CandidateLoadScreen';
                } else {
                    screen = 'VoterLoadScreen';
                }
            }
            navigation.replace(screen, {userType});
        }
        start();
    });

    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default VerifyUser;
