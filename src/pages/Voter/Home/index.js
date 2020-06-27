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

const Home = ({navigation}) => {
    const voter = useSelector((state) => state.Voter);
    const followedCandidates = useSelector((state) => state.FollowedCandidates);
    const [mayors, setMayors] = useState(null);
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMayors() {
            var candidates = [];
            await database()
                .ref('candidates/mayor')
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            candidates = [...candidates, childSnapshot.val()];
                        });
                    }
                });
            setMayors(candidates);
        }
        async function getFollowedCandidatesPosts() {
            var posts = [];
            followedCandidates.map(async (candidate) => {
                await database()
                    .ref(`posts/${candidate.uId}`)
                    .orderByKey()
                    .once('value', (snapShot) => {
                        if (snapShot.val()) {
                            snapShot.forEach((childSnapshot) => {
                                posts = [...posts, childSnapshot.val()];
                            });
                        }
                    });
            });
            setPosts(posts);
        }
        if (!mayors) {
            getMayors();
        }
        if (!posts) {
            getFollowedCandidatesPosts(0);
        }
    });

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
                user={{
                    name: 'felipe teste',
                    photo: 'null',
                }}
                admin={false}
                key={post.postKey}
                voter={voter}
                isAlreadyLiked={false /*isPOstLiked(post.postKey)*/}
            />
        ));
    }

    // function isPOstLiked(postKey) {
    //     var isLiked = false;
    //     likedPostsList.map((key) => {
    //         if (key === postKey) {
    //             isLiked = true;
    //         }
    //     });
    //     return isLiked;
    // }

    function renderMayors() {
        return mayors.map((mayor) => {
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
    function renderCityCouncilors() {}
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
            <CandidatesView>
                <Text size="18px" padding="0 0 0 20px;">
                    Prefeitos
                </Text>
                {mayors && (
                    <CandidatesRow horizontal={true}>
                        {renderMayors()}
                    </CandidatesRow>
                )}
            </CandidatesView>
            <Text size="18px">Vereadores</Text>
            <CandidatesRow>{renderCityCouncilors()}</CandidatesRow>
            {posts && <View>{renderPosts()}</View>}
        </Container>
    );
};

export default Home;
