import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';
import Container from '../../components/Container';

import {startAddresses} from '../../store/modules/Address/actions';
import {startEvents} from '../../store/modules/Event/actions';
import {startPosts} from '../../store/modules/Posts/actions';
import {startCandidate} from '../../store/modules/Candidate/actions';

const LoadCandidate = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {userType} = route.params;
    useEffect(() => {
        async function start() {
            const user = auth().currentUser;
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
            navigation.replace('CandidatePostsScreen');
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
