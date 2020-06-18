import React, {useRef, useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';

import loadAnimation from '../../../../assets/animations/load.json';
import Container from '../../../../components/Container';
import BackButton from '../../../../components/BackButton';
import Text from '../../../../components/Text';
import ProfileInfo from '../../../../components/ProfileInfo';
import {Header, Photo} from './styles';

import {persistPhoto, getPhotoDownloadUrl} from '../../../../utils/handlers';
import * as validations from '../../../../utils/validations';
import {updateInfo} from '../../../../store/modules/Candidate/actions';

const Profile = ({navigation}) => {
    const candidate = useSelector((state) => state.Candidate);

    const dispatch = useDispatch();

    const [isLoading, setIsloading] = useState(false);

    const campaignNameRef = useRef();
    const viceNameRef = useRef();
    const partyref = useRef();
    const numberRef = useRef();
    const aboutRef = useRef();

    async function handleUpdatePhoto(photo) {
        setIsloading(true);
        const storagePath = `profile/${candidate.uId}/profilePhoto.jpg`;
        await persistPhoto(storagePath, photo.path);
        const downloadUrl = await getPhotoDownloadUrl(storagePath);
        dispatch(updateInfo('photo', downloadUrl));
        setIsloading(false);
    }

    function handleImagePicker() {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                let source = response;
                handleUpdatePhoto(source);
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

    if (isLoading) {
        return (
            <Container>
                <Lottie source={loadAnimation} autoPlay loop />
            </Container>
        );
    }
    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="voltar" />
            <ScrollView>
                <Header>
                    <TouchableOpacity onPress={() => handleImagePicker()}>
                        <Photo source={{uri: candidate.photo}} />
                    </TouchableOpacity>
                    <Text>{candidate.name}</Text>
                </Header>
                <ProfileInfo
                    info={candidate.campaignName}
                    inputRef={campaignNameRef}
                    fieldRef="campaignName"
                    candidateKey={candidate.candidateKey}
                    multiLine={false}
                    validator={validations.isName}
                    error={validations.errors.invalidName}
                />
                <ProfileInfo
                    info={candidate.viceName}
                    inputRef={viceNameRef}
                    fieldRef="viceName"
                    candidateKey={candidate.candidateKey}
                    multiLine={false}
                    validator={validations.isName}
                    error={validations.errors.invalidName}
                />
                <ProfileInfo
                    info={candidate.party}
                    inputRef={partyref}
                    fieldRef="party"
                    candidateKey={candidate.candidateKey}
                    multiLine={false}
                    validator={validations.isParty}
                    error={validations.errors.invalidParty}
                />
                <ProfileInfo
                    info={candidate.number}
                    inputRef={numberRef}
                    fieldRef="number"
                    type="numeric"
                    max={2}
                    candidateKey={candidate.candidateKey}
                    multiLine={false}
                    validator={validations.isParty}
                    error={validations.errors.invalidNumber}
                />
                <ProfileInfo
                    info={candidate.about}
                    inputRef={aboutRef}
                    fieldRef="about"
                    candidateKey={candidate.candidateKey}
                    multiLine
                    numRow={5}
                />
            </ScrollView>
        </Container>
    );
};

export default Profile;
