import React from 'react';
import {View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import BackButton from '../../../../components/BackButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { Container } from './styles';

async function persistPhoto(uId, filePath) {
    const storageRef = storage().ref('files/governmentPlan');
    const endPath = storageRef.child(uId + '/gp.pdf');
    await endPath.putFile(filePath);
}

async function getPhotoDownloadUrl(uId) {
    const storageRef = storage().ref('files/governmentPlan/' + uId + '/gp.pdf');
    try {
        const url = await storageRef.getDownloadURL();
        return url;
    } catch (err) {
        console.log(err);
    }
}

const GovernmentPlan = ({navigation}) => {
    async function handlePickFile() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            console.warn('Uploading file');

            navigation.goBack();
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    return (
        <Container>
            <BackButton action={() => navigation.goBack()} />
            <Text>Government plan</Text>
            <TouchableOpacity onPress={handlePickFile}>
                <Text>Escolçher file</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default GovernmentPlan;
