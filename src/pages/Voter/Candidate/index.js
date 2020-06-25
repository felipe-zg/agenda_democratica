import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, View} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {
    addFollowedCandidate,
    deleteFollowedCandidate,
} from '../../../store/modules/FollowedCandidates/actions';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
import Event from '../../../components/Event';
import Post from '../../../components/Post';
import {Header, Photo, Info, Label, Value, Link, FollowButton} from './styles';

export default function Candidate({route, navigation}) {
    const {candidate} = route.params;
    const {voterFollowsCandidate} = route.params;
    const [events, setEvents] = useState(null);
    const [posts, setPosts] = useState(null);
    const [likedPostsList, setLikedPostsList] = useState(null);
    const [isFollowed, setIsFollowed] = useState(voterFollowsCandidate);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getEvents() {
            var returnedEvents = [];
            await database()
                .ref(`events/${candidate.uId}`)
                .orderByChild('date')
                .limitToFirst(3)
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnedEvents = [
                                ...returnedEvents,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });

            setEvents(returnedEvents);
        }

        async function getLikedPosts() {
            var returnedLikedPOsts = [];
            await database()
                .ref(`likedPosts/${voter.uid}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnedLikedPOsts = [
                                ...returnedLikedPOsts,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });

            setLikedPostsList(returnedLikedPOsts);
        }

        async function getPosts() {
            var returnedPosts = [];
            await database()
                .ref(`posts/${candidate.uId}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnedPosts = [
                                ...returnedPosts,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });

            setPosts(returnedPosts);
        }

        if (!events) {
            getEvents();
        }
        if (!likedPostsList) {
            getLikedPosts();
        }
        if (!posts) {
            getPosts();
        }
    });

    const voter = auth().currentUser;

    function renderInfo(label, value) {
        return (
            <Info>
                <Label>
                    <Text numberOfLines={1}>{label}:</Text>
                </Label>
                <Value>
                    <Text>{value}</Text>
                </Value>
            </Info>
        );
    }

    function renderEvents() {
        var max = 0;
        const uid = candidate.uId;
        return events.map((event) => {
            if (max === 3) {
                return;
            } else {
                max++;
            }
            return (
                <Event
                    key={event.eventKey}
                    event={event}
                    callback={() =>
                        navigation.navigate('EventDetailsScreen', {
                            uid: candidate.uId,
                            event,
                        })
                    }
                />
            );
        });
    }

    function renderPosts() {
        return posts.map((post) => (
            <Post
                post={post}
                user={candidate}
                admin={false}
                key={post.postKey}
                voter={voter}
                isAlreadyLiked={isPOstLiked(post.postKey)}
            />
        ));
    }

    function isPOstLiked(postKey) {
        var isLiked = false;
        likedPostsList.map((key) => {
            if (key === postKey) {
                isLiked = true;
            }
        });
        return isLiked;
    }

    async function handleFollow() {
        if (isFollowed) {
            await database()
                .ref(`followedCandidates/${voter.uid}`)
                .child(candidate.candidateKey)
                .remove();
            dispatch(deleteFollowedCandidate(candidate.candidateKey));
        } else {
            await database()
                .ref(`followedCandidates/${voter.uid}`)
                .child(candidate.candidateKey)
                .set(candidate.candidateKey);
            dispatch(addFollowedCandidate(candidate.candidateKey));
        }
        setIsFollowed(!isFollowed);
    }

    return (
        <Container>
            <ScrollView>
                <BackButton title="voltar" action={() => navigation.goBack()} />
                <Header>
                    <Photo source={{uri: candidate.photo}} />
                    <FollowButton
                        onPress={handleFollow}
                        color={isFollowed ? '#f00' : '#00f'}>
                        <Text>
                            {isFollowed ? 'Deixar de seguir' : 'Seguir'}
                        </Text>
                    </FollowButton>
                </Header>
                {renderInfo('Candidato', candidate.campaignName)}
                {renderInfo('Vice', candidate.viceName)}
                {renderInfo('Partido', candidate.party)}
                {renderInfo('Número', candidate.number)}
                {renderInfo('Sobre', candidate.about)}
                <Text padding="20px" size="18px">
                    Eventos
                </Text>
                {events && renderEvents()}
                {events && events.length > 1 && (
                    <Link
                        onPress={() =>
                            navigation.navigate('EventListScreen', {
                                uid: candidate.uId,
                            })
                        }>
                        <Text>Ver mais...</Text>
                    </Link>
                )}
                {posts && <View>{renderPosts()}</View>}
            </ScrollView>
        </Container>
    );
}
