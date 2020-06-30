import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

import {updateInfo} from '../../store/modules/Candidate/actions';
import {errors} from '../../utils/validations';
import {handleInputChange} from '../../utils/handlers';
import Text from '../../components/Text';

import {Row, EditInput, Touch} from './styles';

const ProfileInfo = ({
    info,
    inputRef,
    candidateKey,
    candidateOffice,
    fieldRef,
    multiLine,
    numRows,
    validator,
    error,
    type,
    max,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [infoValue, setInfoValue] = useState(info);
    const [valueError, setValueError] = useState(errors.valid);
    const [iconColor, setIconColor] = useState('#00f');
    const dispatch = useDispatch();
    useEffect(() => {
        setIconColor(valueError === errors.valid ? '#00f' : '#f00');
    }, [valueError]);

    function handleUpdate() {
        setIsEditing(false);
        try {
            const value = infoValue.trim();
            if (value === '') {
                Toast.show('A informação não pode ser vazia');
                setInfoValue(info);
                return;
            }
            database()
                .ref(`candidates/${candidateOffice}/${candidateKey}`)
                .child(fieldRef)
                .set(value);
            Toast.show('Informação atualizada com sucesso');
            dispatch(updateInfo(fieldRef, value));
        } catch (e) {
            Toast.show('Erro ao atualizar');
            setInfoValue(info);
        } finally {
            inputRef.current.blur();
        }
    }

    function handleFocusInput() {
        setIsEditing(true);
        inputRef.current.focus();
    }

    return (
        <>
            {valueError !== errors.valid && (
                <Text size="10px" color="#f00" padding="0 15px">
                    {valueError.message}
                </Text>
            )}
            <Row>
                <EditInput
                    ref={inputRef}
                    editable={isEditing ? true : false}
                    width={isEditing ? '0.5px' : '0'}
                    color={valueError === errors.valid ? '#00f' : '#f00'}
                    multiline={multiLine}
                    numberOfLines={numRows || 1}
                    keyboardType={type || 'default'}
                    maxLength={max || undefined}
                    value={infoValue.replace(/( )+/g, ' ')}
                    returnKeyType="send"
                    onSubmitEditing={handleUpdate}
                    onChangeText={(value) => {
                        handleInputChange(
                            value,
                            setInfoValue,
                            validator,
                            valueError,
                            setValueError,
                            error,
                        );
                    }}
                />
                <Touch
                    disabled={valueError === errors.valid ? false : true}
                    onPress={() =>
                        isEditing ? handleUpdate() : handleFocusInput()
                    }>
                    <Icon
                        name={isEditing ? 'arrow-forward' : 'mode-edit'}
                        color={isEditing ? iconColor : '#fff'}
                        size={25}
                    />
                </Touch>
            </Row>
        </>
    );
};

export default ProfileInfo;
