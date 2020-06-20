import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';

import {startAddresses} from '../../store/modules/Address/actions';
import {startEvents} from '../../store/modules/Event/actions';
import {startPosts} from '../../store/modules/Posts/actions';
import {startCandidate} from '../../store/modules/Candidate/actions';

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
                screen = await verifyUserType(user);
            }
            navigation.replace(screen);
        }
        start();
    });

    async function verifyUserType(user) {
        var userType;
        await database()
            .ref('/users/')
            .child(user.uid)
            .once('value')
            .then(function (snapshot) {
                userType = snapshot.val();
            });
        if (userType === 'mayor') {
            // await startCandidate(userType);
            let addresses = [];
            let events = [];
            let posts = [];
            let candidate = null;
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
            await database()
                .ref(`posts/${user.uid}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            posts = [...posts, childSnapshot.val()];
                        });
                    }
                });
            await database()
                .ref(`candidates/${userType}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            const data = childSnapshot.val();
                            if (data.uId === user.uid) {
                                candidate = data;
                            }
                        });
                    }
                });

            dispatch(startAddresses(addresses));
            dispatch(startEvents(events));
            dispatch(startPosts(posts));
            dispatch(startCandidate(candidate));
            return 'CandidatePostsScreen';
        } else {
            // await startVoter();
            return 'VoterHomeScreen';
        }
    }

    async function startCandidate(candidateType) {}

    async function startVoter() {}

    return (
        <Container>
            <Lottie source={loadAnimation} autoPlay loop />
        </Container>
    );
};

export default Load;
