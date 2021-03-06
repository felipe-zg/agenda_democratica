import React, {useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import BackButton from '../../../../components/BackButton';
import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import {useSelector, useDispatch} from 'react-redux';
import {Addresses, Address, Row, IconTouch} from './styles';

import {deleteAddress} from '../../../../store/modules/Address/actions';

const AddressesList = ({navigation}) => {
    const addresses = useSelector((state) => state.Addresses);
    const dispatch = useDispatch();
    const user = auth().currentUser;

    async function handleDeleteAddress(key) {
        try {
            if (await isAddressBeingUsedByAnyEvent(key)) {
                Toast.show(
                    'O endereço está sendo usado por algum evento e não pode ser excluído',
                );
                return;
            }
            await database().ref(`/addresses/${user.uid}/`).child(key).remove();
            dispatch(deleteAddress(key));
            Toast.show('Endereço excluído com sucesso');
        } catch (e) {
            Toast.show('Erro ao excluir endereço');
        }
    }

    async function isAddressBeingUsedByAnyEvent(key) {
        var isBeingUsed = false;
        await database()
            .ref(`/events/${user.uid}/`)
            .orderByKey()
            .once('value', (snapShot) => {
                if (snapShot.val()) {
                    snapShot.forEach((childSnapshot) => {
                        if (childSnapshot.val().address === key) {
                            isBeingUsed = true;
                        }
                    });
                }
            });
        return isBeingUsed;
    }

    function renderAddress(address) {
        return (
            <Address testID="address">
                <View>
                    <Row>
                        <Text>{address.street}, </Text>
                        <Text>{address.number}</Text>
                    </Row>
                    <Row>
                        <Text>{address.county} - </Text>
                        <Text> {address.city}</Text>
                    </Row>
                    <Text>{address.cep}</Text>
                </View>
                <View>
                    <IconTouch
                        testID="delete-button"
                        onPress={() => handleDeleteAddress(address.addressKey)}>
                        <Icon name="trash-can-outline" size={30} color="#f00" />
                    </IconTouch>
                </View>
            </Address>
        );
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="dashboard" />
            <Addresses
                testID="addresses-list"
                data={addresses}
                renderItem={({item}) => renderAddress(item)}
                keyExtractor={(item) => item.addressKey}
            />
        </Container>
    );
};

export default AddressesList;
