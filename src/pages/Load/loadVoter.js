import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';
import Container from '../../components/Container';

import {startAddresses} from '../../store/modules/Address/actions';

const LoadCandidate = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        async function start() {
            const user = auth().currentUser;
            let voter = null;
            //BUSCAR ELEITOR E STARTATR NO REDUCER
            // await database()
            //     .ref('voters/')
            //     .orderByKey()
            //     .once('value', (snapShot) => {
            //         if (snapShot.val()) {
            //             snapShot.forEach((childSnapshot) => {
            //                 const data = childSnapshot.val();
            //                 if (data.uId === user.uid) {
            //                     voter = data;
            //                 }
            //             });
            //         }
            //     });

            // dispatch(startVoter(voter));
            navigation.replace('VoterHomeScreen');
        }
        start();
    });

    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default LoadCandidate;
