import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

import {updateInfo} from '../../store/modules/Candidate/actions';

import {Row, EditInput, Touch} from './styles';

const ProfileInfo = ({info, inputRef, candidateKey, fieldRef}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [infoValue, setInfoValue] = useState(info);

    const dispatch = useDispatch();

    function handleUpdate() {
        setIsEditing(false);
        try {
            database()
                .ref(`candidates/${candidateKey}`)
                .child(fieldRef)
                .set(infoValue);
            inputRef.current.blur();
            Toast.show('Informação atualizada com sucesso');
            dispatch(updateInfo(fieldRef, infoValue));
        } catch (e) {
            Toast.show('Erro ao atualizar');
            setInfoValue(info);
            inputRef.current.blur();
        }
    }

    function handleFocusInput() {
        setIsEditing(true);
        inputRef.current.focus();
    }

    return (
        <Row>
            <EditInput
                ref={inputRef}
                editable={isEditing ? true : false}
                border={isEditing ? '0.5px' : '0'}
                value={infoValue}
                onChangeText={setInfoValue}
                returnKeyType="send"
                onSubmitEditing={handleUpdate}
            />
            <Touch
                onPress={() =>
                    isEditing ? handleUpdate() : handleFocusInput()
                }>
                <Icon
                    name={isEditing ? 'arrow-forward' : 'mode-edit'}
                    color={isEditing ? '#00f' : '#fff'}
                    size={25}
                />
            </Touch>
        </Row>
    );
};

export default ProfileInfo;
