import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

import {deletePost} from '../../store/modules/Posts/actions';

import Text from '../Text';

import {
    Container,
    PostHeader,
    Profile,
    ProfilePhoto,
    Touch,
    PostPhoto,
} from './styles';

const Post = ({post, user}) => {
    const dispatch = useDispatch();

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
                {
                    text: 'Atualizar post',
                    onPress: () => console.warn('atualizando post'),
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
                    <ProfilePhoto source={{uri: user.photoURL}} />
                    <Text padding="0 0 0 15px">{user.displayName}</Text>
                </Profile>
                <Touch onPress={handlePostOptions}>
                    <Icon name="keyboard-arrow-down" color="#fff" size={25} />
                </Touch>
            </PostHeader>
            <Text padding="0 10px 20px 10px" color="#ddd" size="10px">
                {post.text}
            </Text>
            {post.photo && <PostPhoto source={{uri: post.photo}} />}
        </Container>
    );
};

export default Post;
