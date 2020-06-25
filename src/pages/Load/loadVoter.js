import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../assets/animations/load.json';
import Container from '../../components/Container';

import {startVoter} from '../../store/modules/Voter/actions';
import {startFollowedCandidatesList} from '../../store/modules/FollowedCandidates/actions';
import {startFavoriteEventsList} from '../../store/modules/FavoriteEvents/actions';

const LoadCandidate = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        async function start() {
            const user = auth().currentUser;
            let voter = null;
            var followedCandidates = [];
            var favoriteEvents = [];
            await database()
                .ref('voters/')
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            const data = childSnapshot.val();
                            if (data.uId === user.uid) {
                                voter = data;
                                dispatch(startVoter(voter));
                            }
                        });
                    }
                });
            await database()
                .ref(`followedCandidates/${user.uid}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            followedCandidates = [
                                ...followedCandidates,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });

            await database()
                .ref(`favoriteEvents/${user.uid}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            favoriteEvents = [
                                ...favoriteEvents,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });

            dispatch(startFollowedCandidatesList(followedCandidates));
            dispatch(startFavoriteEventsList(favoriteEvents));

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
