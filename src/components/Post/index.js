import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

import {deletePost} from '../../store/modules/Posts/actions';
import {likePost, dislikePost} from '../../store/modules/LikedPosts/actions';

import Text from '../Text';

import {
    Container,
    PostHeader,
    Profile,
    ProfilePhoto,
    Touch,
    PostPhoto,
} from './styles';

const Post = ({post, user, admin, isAlreadyLiked, voter}) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(isAlreadyLiked);

    async function handleLike() {
        if (!isLiked) {
            await database()
                .ref(`likedPosts/${voter.uid}`)
                .child(post.postKey)
                .set(post.postKey);
            dispatch(likePost(post.postKey));
        } else {
            await database()
                .ref(`likedPosts/${voter.uid}`)
                .child(post.postKey)
                .remove();
            dispatch(dislikePost(post.postKey));
        }
        setIsLiked(!isLiked);
    }

    function handlePostOptions() {
        Alert.alert(
            undefined,
            undefined,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar post',
                    onPress: () => confirmDeleteAlert(),
                },
            ],
            {cancelable: false},
        );
    }

    function confirmDeleteAlert(title, key) {
        Alert.alert(
            'Excluir',
            'Tem certeza que deseja excluir o post ?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar post',
                    onPress: () => handleDelete(),
                },
            ],
            {cancelable: false},
        );
    }

    async function handleDelete() {
        database()
            .ref(`posts/${user.uid}/${post.postKey}`)
            .remove()
            .then(() => {
                Toast.show('Post excluído');
                dispatch(deletePost(post.postKey));
            })
            .catch((e) => {
                Toast.show('Erro ao deletar post');
            });
    }

    return (
        <Container>
            <PostHeader>
                <Profile>
                    <ProfilePhoto source={{uri: post.userPhoto}} />
                    <View>
                        <Text padding="0 0 0 15px">{post.userName}</Text>
                        <Text padding="0 0 0 15px" size="8px">
                            {post.date} às {post.time}
                        </Text>
                    </View>
                </Profile>
                {admin && (
                    <Touch onPress={handlePostOptions}>
                        <Icon
                            name="keyboard-arrow-down"
                            color="#fff"
                            size={25}
                        />
                    </Touch>
                )}
                {!admin && (
                    <Touch onPress={handleLike}>
                        <AntIcon
                            name={isLiked ? 'like1' : 'like2'}
                            color={isLiked ? '#00f' : '#fff'}
                            size={25}
                        />
                    </Touch>
                )}
            </PostHeader>
            <Text padding="0 10px 20px 10px" color="#ddd" size="10px">
                {post.text}
            </Text>
            {post.photo && <PostPhoto source={{uri: post.photo}} />}
        </Container>
    );
};

export default Post;
