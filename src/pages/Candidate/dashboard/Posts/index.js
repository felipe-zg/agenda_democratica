import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-simple-toast';

import {addPost} from '../../../../store/modules/Posts/actions';

import {persistPhoto, getPhotoDownloadUrl} from '../../../../utils/handlers';

import loadAnimation from '../../../../assets/animations/load.json';

import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import Post from '../../../../components/Post';
import {
    Header,
    Row,
    Photo,
    PostInput,
    Touch,
    PostOptions,
    PostsList,
    PostPhoto,
} from './styles';

const renderpost = (post) => {
    return <Text>{post.text}</Text>;
};

const Posts = ({navigation}) => {
    const [post, setPost] = useState('');
    const [inputBorderRadius, setInputBorderRadius] = useState('35px');
    const [inputWidth, setInputWidth] = useState('70%');
    const [inputHeight, setInputHeight] = useState('undefined');
    const [inputNumberOfLines, setInputNumberOfLines] = useState(1);
    const [photo, setPhoto] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const postRef = useRef();

    const candidate = useSelector((state) => state.Candidate);
    const posts = useSelector((state) => state.Posts);
    const dispatch = useDispatch();

    function togglePost() {
        setIsPosting(!isPosting);
        setInputWidth(inputWidth === '70%' ? '100%' : '70%');
        setInputHeight(inputHeight === 'undefined' ? '250px' : 'undefined');
        setInputBorderRadius(inputBorderRadius === '35px' ? '0' : '35px');
        setInputNumberOfLines(inputNumberOfLines === 1 ? 15 : 1);
        setPhoto(null);
    }

    function handleImagePicker() {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                let source = response;
                setPhoto(source);
                return;
            } else {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    return;
                }
                if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    return;
                }
            }
        });
    }

    function getDate() {
        const date = new Date();
        return `${date.getDate()}/${
            date.getMonth() + 1
        } de ${date.getFullYear()}`;
    }

    function getTime() {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    async function handlePost() {
        try {
            setIsLoading(true);
            const uId = auth().currentUser.uid;
            const date = getDate();
            const time = getTime();
            const ref = database().ref(`/posts/${uId}`);
            const key = ref.push().key;

            var downloadUrl = '';
            if (photo) {
                await persistPhoto(`posts/${uId}/${key}/photo.jpg`, photo.path);
                downloadUrl = await getPhotoDownloadUrl(
                    `posts/${uId}/${key}/photo.jpg`,
                );
                savePost(ref, key, {
                    postKey: key,
                    text: post,
                    photo: downloadUrl,
                    userName: candidate.campaignName,
                    userPhoto: candidate.photo,
                    date,
                    time,
                });
            } else {
                savePost(ref, key, {
                    postKey: key,
                    text: post,
                    userName: candidate.campaignName,
                    userPhoto: candidate.photo,
                    date,
                    time,
                });
            }
            setPost('');
            setPhoto(null);
        } catch (e) {
            Toast.show('Algo deu errado');
        }
    }

    async function savePost(ref, key, post) {
        await ref
            .child(key)
            .set(post)
            .then(() => {
                Toast.show('Postado com sucesso');
                togglePost();
                setIsLoading(false);
            })
            .catch((e) => {
                Toast.show('Algo deu errado, tente novamente');
                setIsLoading(false);
            });
        dispatch(addPost(post));
    }

    if (isLoading) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
        );
    }
    return (
        <Container>
            {isPosting && (
                <PostOptions>
                    <Touch onPress={() => postRef.current.blur()}>
                        <Text>Cancelar</Text>
                    </Touch>
                    <Touch
                        onPress={handlePost}
                        disabled={post.length === 0 ? true : false}>
                        <Text color={post.length === 0 ? '#3f3f3f' : '#fff'}>
                            Postar
                        </Text>
                    </Touch>
                </PostOptions>
            )}
            <Header>
                {photo && (
                    <TouchableOpacity onPress={handleImagePicker}>
                        <PostPhoto source={{uri: photo.uri}} />
                    </TouchableOpacity>
                )}
                <Row>
                    {!isPosting && (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('CandidateProfileScreen')
                            }>
                            <Photo source={{uri: candidate.photo}} />
                        </TouchableOpacity>
                    )}
                    <PostInput
                        placeholder="Novo post"
                        multiline={true}
                        maxLength={280}
                        numberOfLines={inputNumberOfLines}
                        borderRadius={inputBorderRadius}
                        width={inputWidth}
                        height={inputHeight}
                        ref={postRef}
                        value={postRef}
                        onFocus={() => togglePost()}
                        onBlur={() => togglePost()}
                        onChangeText={setPost}
                    />
                    {!isPosting && (
                        <Touch
                            onPress={() =>
                                navigation.navigate('CandidateDashboardScreen')
                            }>
                            <Icon name="menu" color="#fff" size={35} />
                        </Touch>
                    )}
                </Row>
                {isPosting && (
                    <>
                        <Row align="space-between">
                            {!photo && (
                                <Touch onPress={handleImagePicker}>
                                    <Icon
                                        name="camera"
                                        color="#ddd"
                                        size={40}
                                    />
                                </Touch>
                            )}
                            <Text
                                padding={photo ? '5px 0 0 10px' : '0 10px 0 0'}
                                size={photo ? '8px' : undefined}>
                                {280 - post.length} caracteres
                            </Text>
                        </Row>
                    </>
                )}
            </Header>
            {!isPosting && (
                <PostsList
                    data={posts}
                    renderItem={({item}) => (
                        <Post post={item} user={candidate} admin={true} />
                    )}
                    keyExtractor={(item) => item.postKey}
                />
            )}
        </Container>
    );
};

export default Posts;
