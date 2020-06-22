import React, {useState, useEffect, useCallback, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Lottie from 'lottie-react-native';
import {useDispatch} from 'react-redux';

import loadAnimation from '../../../assets/animations/load.json';

import BackButton from '../../../components/BackButton';
import Container from '../../../components/Container';
import Text from '../../../components/Text';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {Header, Photo} from './styles';

import addPhoto from '../../../assets/add.png';

import {errors, isFullName} from '../../../utils/validations';
import {removeUnnecessaryBlankSpaces} from '../../../utils/regexes';
import * as handler from '../../../utils/handlers';

import {startVoter} from '../../../store/modules/Voter/actions';

const Register = ({navigation}) => {
    //value
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);

    const [buttonBackground, setButtonBackground] = useState('#ddd');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //errors
    const [nameError, setNameError] = useState(errors.valid);

    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (formIsValid()) {
            setButtonBackground('#00f');
            setIsButtonDisabled(false);
        } else {
            setButtonBackground('#ddd');
            setIsButtonDisabled(true);
        }
    });

    const formIsValid = useCallback(() => {
        return name !== '' && nameError === errors.valid && photo !== null;
    }, [name, nameError, photo]);

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

    async function handleRegister() {
        try {
            setIsLoading(true);
            const user = auth().currentUser;
            await handler.persistPhoto(
                `profile/${user.uid}/profilePhoto.jpg`,
                photo.path,
            );
            const downloadUrl = await handler.getPhotoDownloadUrl(
                `profile/${user.uid}/profilePhoto.jpg`,
            );
            await user.updateProfile({
                displayName: name,
                photoURL: downloadUrl,
            });
            const ref = database().ref('/voters');
            const key = ref.push().key;
            const voter = getVoter(user.uid, key, downloadUrl);
            ref.child(key).set(voter);
            Toast.show('Bem-vindo(a) ao agenda democrática');
            dispatch(startVoter(voter));
            navigation.replace('VoterHomeScreen');
        } catch (e) {
            Toast.show('Algo deu errado');
        } finally {
            setIsLoading(false);
        }
    }

    function getVoter(uId, key, downloadUrl) {
        return {
            name,
            uId,
            voterKey: key,
            photo: downloadUrl,
        };
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
            <BackButton action={() => navigation.goBack()} title="lvoltar" />
            <Form>
                <Header>
                    <TouchableOpacity onPress={handleImagePicker}>
                        <Photo source={photo ? {uri: photo.uri} : addPhoto} />
                    </TouchableOpacity>
                </Header>

                <Text>Nome</Text>
                {nameError !== errors.valid && (
                    <Text color="#f00" size="8px">
                        {nameError.message}
                    </Text>
                )}
                <Input
                    border={nameError.border}
                    autoCapitalize="words"
                    value={removeUnnecessaryBlankSpaces(name)}
                    onChangeText={(name) => {
                        handler.handleInputChange(
                            name,
                            setName,
                            isFullName,
                            nameError,
                            setNameError,
                            errors.invalidFullName,
                        );
                    }}
                />

                <Button
                    title="Cadastrar"
                    background={buttonBackground}
                    disabled={isButtonDisabled}
                    callback={() => handleRegister()}
                />
            </Form>
        </Container>
    );
};

export default Register;
