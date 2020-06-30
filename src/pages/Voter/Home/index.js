import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {clearUser} from '../../../store/modules/Voter/actions';

import Container from '../../../components/Container';
import Post from '../../../components/Post';
import Text from '../../../components/Text';
import {
    Header,
    Photo,
    CandidatesView,
    CandidatesRow,
    Candidate,
    CandidateName,
    Row,
} from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
    const voter = useSelector((state) => state.Voter);
    const followedCandidates = useSelector((state) => state.FollowedCandidates);
    const likedPosts = useSelector((state) => state.LikedPosts);
    const [mayors, setMayors] = useState(null);
    const [cityCouncilors, setCityCouncilors] = useState(null);
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMayors() {
            var returnerMayors = [];
            await database()
                .ref('candidates/mayor')
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnerMayors = [
                                ...returnerMayors,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });
            setMayors(returnerMayors);
        }
        async function getCityCouncilors() {
            var returnedCityCouncilors = [];
            await database()
                .ref('candidates/cityCouncilor')
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnedCityCouncilors = [
                                ...returnedCityCouncilors,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });
            setCityCouncilors(returnedCityCouncilors);
        }
        async function getFollowedCandidatesPosts() {
            followedCandidates.map(async (candidate) => {
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
                if (posts) {
                    setPosts([...posts, returnedPosts]);
                } else {
                    setPosts(returnedPosts);
                }
            });
        }
        if (!mayors) {
            getMayors();
        }
        if (!cityCouncilors) {
            getCityCouncilors();
        }
        if (!posts) {
            getFollowedCandidatesPosts();
        }
    });

    useEffect(() => {}, [likedPosts]);

    function handleSignOut() {
        auth()
            .signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'VerifyUserScreen'}],
                });
                dispatch(clearUser());
            });
    }

    function isFollowed(candidateKey) {
        var status = false;
        followedCandidates.map((followed) => {
            if (followed.key === candidateKey) {
                status = true;
            }
        });
        return status;
    }

    function renderPosts() {
        return posts.map((post) => (
            <Post
                post={post}
                admin={false}
                key={post.postKey}
                voter={voter}
                isAlreadyLiked={isPOstLiked(post.postKey)}
            />
        ));
    }

    function isPOstLiked(postKey) {
        var isLiked = false;
        likedPosts.map((key) => {
            if (key === postKey) {
                isLiked = true;
            }
        });
        return isLiked;
    }

    function renderMayors(office) {
        const list = office === 'mayor' ? mayors : cityCouncilors;
        return list.map((mayor) => {
            return (
                <TouchableOpacity
                    key={mayor.candidateKey}
                    onPress={() =>
                        navigation.navigate('CandidateDetailsScreen', {
                            candidate: mayor,
                            voterFollowsCandidate: isFollowed(
                                mayor.candidateKey,
                            ),
                        })
                    }>
                    <Candidate source={{uri: mayor.photo}}>
                        <CandidateName>
                            <Text numberOfLines={2}>{mayor.campaignName}</Text>
                        </CandidateName>
                    </Candidate>
                </TouchableOpacity>
            );
        });
    }
    return (
        <Container>
            <Header>
                <Row>
                    <Photo source={{uri: voter.photo}} />
                    <Text padding="0 0 0 10px">{voter.name}</Text>
                </Row>
                <TouchableOpacity onPress={() => handleSignOut()}>
                    <Text>Sair</Text>
                </TouchableOpacity>
            </Header>
            <ScrollView>
                <CandidatesView>
                    <Text size="18px" padding="0 0 0 20px;">
                        Prefeitos
                    </Text>
                    {mayors && (
                        <CandidatesRow horizontal={true}>
                            {renderMayors('mayor')}
                        </CandidatesRow>
                    )}
                </CandidatesView>
                <CandidatesView>
                    <Text size="18px" padding="0 0 0 20px;">
                        Vereadores
                    </Text>
                    {cityCouncilors && (
                        <CandidatesRow horizontal={true}>
                            {renderMayors('cityCouncilor')}
                        </CandidatesRow>
                    )}
                </CandidatesView>
                {posts && <View>{renderPosts()}</View>}
            </ScrollView>
        </Container>
    );
};

export default Home;
