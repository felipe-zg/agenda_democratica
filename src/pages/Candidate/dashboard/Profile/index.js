import React, {useRef, useState} from 'react';
import {TouchableOpacity, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

import Container from '../../../../components/Container';
import BackButton from '../../../../components/BackButton';
import Text from '../../../../components/Text';
import ProfileInfo from '../../../../components/ProfileInfo';
import {Header, Photo} from './styles';

import {persistPhoto, getPhotoDownloadUrl} from '../../../../utils/handlers';

const Profile = ({navigation}) => {
    const user = auth().currentUser;
    const candidate = useSelector((state) => state.Candidate);
    const [photo, setPhoto] = useState(null);

    const campaignNameRef = useRef();
    const viceNameRef = useRef();
    const partyref = useRef();
    const numberRef = useRef();
    const aboutRef = useRef();

    async function handleUpdatePhoto() {
        await handleImagePicker();
        if (photo) {
            const storagePath = `profile/${user.uid}/profilePhoto.jpg`;
            await persistPhoto(storagePath, photo.path);
            const downloadUrl = await getPhotoDownloadUrl(storagePath);
            await user.updateProfile({
                photoURL: downloadUrl,
            });
            setPhoto(null);
        }
    }

    async function handleImagePicker() {
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
                    return;
                }
                if (response.error) {
                    Toast.show('Erro ao enviar foto');
                    return;
                }
            }
        });
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="Posts" />
            <Header>
                <TouchableOpacity onPress={() => handleUpdatePhoto()}>
                    <Photo source={{uri: user.photoURL}} />
                </TouchableOpacity>
                <Text>{user.displayName}</Text>
            </Header>
            <ProfileInfo
                info={candidate.campaignName}
                inputRef={campaignNameRef}
                fieldRef="campaignName"
                candidateKey={candidate.candidateKey}
            />
            <ProfileInfo
                info={candidate.viceName}
                inputRef={viceNameRef}
                fieldRef="viceName"
                candidateKey={candidate.candidateKey}
            />
            <ProfileInfo
                info={candidate.party}
                inputRef={partyref}
                fieldRef="party"
                candidateKey={candidate.candidateKey}
            />
            <ProfileInfo
                info={candidate.number}
                inputRef={numberRef}
                fieldRef="number"
                candidateKey={candidate.candidateKey}
            />
            <ProfileInfo
                info={candidate.about}
                inputRef={aboutRef}
                fieldRef="about"
                candidateKey={candidate.candidateKey}
            />
        </Container>
    );
};

export default Profile;
