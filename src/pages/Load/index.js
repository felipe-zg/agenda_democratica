import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {startAddresses} from '../../store/modules/Address/actions';
import {startEvents} from '../../store/modules/Event/actions';

import Container from '../../components/Container';
import Text from '../../components/Text';
// import { Container } from './styles';

const Load = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        async function start() {
            const user = auth().currentUser;
            var screen = 'SelectUserScreen';
            if (user) {
                let addresses = [];
                let events = [];
                await database()
                    .ref(`addresses/${user.uid}`)
                    .orderByKey()
                    .once('value', (snapShot) => {
                        if (snapShot.val()) {
                            snapShot.forEach((childSnapshot) => {
                                addresses = [...addresses, childSnapshot.val()];
                            });
                        }
                    });
                await database()
                    .ref(`events/${user.uid}`)
                    .orderByKey()
                    .once('value', (snapShot) => {
                        if (snapShot.val()) {
                            snapShot.forEach((childSnapshot) => {
                                events = [...events, childSnapshot.val()];
                            });
                        }
                    });
                dispatch(startAddresses(addresses));
                dispatch(startEvents(events));
                screen = 'CandidateDashboardScreen';
            }
            navigation.replace(screen);
        }
        start();
    });

    return (
        <Container>
            <Text>Carregando dados</Text>
        </Container>
    );
};

export default Load;
