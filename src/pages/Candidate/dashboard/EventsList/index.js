import React from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import {deleteEvent} from '../../../../store/modules/Event/actions';

import Container from '../../../../components/Container';
import BackButton from '../../../../components/BackButton';
import Event from '../../../../components/Event';
import Text from '../../../../components/Text';

import {Events} from './styles';

const EventsList = ({navigation}) => {
    const events = useSelector((state) => state.Events);
    const dispatch = useDispatch();

    async function removeEventFromDatabase(key) {
        try {
            await database()
                .ref(`/events/${auth().currentUser.uid}`)
                .child(key)
                .remove();
            dispatch(deleteEvent(key));
            Toast.show('Evento excluído com sucesso');
        } catch (e) {
            Toast.show('Erro ao deletar evento');
        }
    }

    function confirmDeleteAlert(title, key) {
        Alert.alert(
            'Excluir',
            `Tem certeza que deseja excluir ${title} ?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar evento',
                    onPress: () => removeEventFromDatabase(key),
                },
            ],
            {cancelable: false},
        );
    }

    function handleEventOptions(event) {
        Alert.alert(
            'Menu',
            'Escolha uma opção',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar evento',
                    onPress: () =>
                        confirmDeleteAlert(event.title, event.eventKey),
                },
                {
                    text: 'Atualizar informações',
                    onPress: () =>
                        navigation.navigate('CandidateEventRegisterScreen', {
                            event,
                        }),
                },
            ],
            {cancelable: false},
        );
    }

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="dashboard" />
            <Events
                data={events}
                renderItem={({item}) => (
                    <Event
                        event={item}
                        callback={() => handleEventOptions(item)}
                    />
                )}
                keyExtractor={(item) => item.eventKey}
            />
        </Container>
    );
};

export default EventsList;
