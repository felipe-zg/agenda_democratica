import React from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import {deleteEvent} from '../../../../store/modules/Event/actions';

import meeting from '../../../../assets/meeting.png';
import car from '../../../../assets/car.png';
import rally from '../../../../assets/rally.png';
import walk from '../../../../assets/walk.png';

import Container from '../../../../components/Container';
import BackButton from '../../../../components/BackButton';
import Text from '../../../../components/Text';

import {Events, Event, Photo, Data} from './styles';

const getPhoto = (category) => {
    if (category === 'Carreata') {
        return car;
    } else if (category === 'Comício') {
        return rally;
    } else if (category === 'Caminhada') {
        return walk;
    } else {
        return meeting;
    }
};

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

    function renderEvent(event) {
        return (
            <Event onLongPress={() => handleEventOptions(event)}>
                <Photo source={getPhoto(event.category)} />
                <Data>
                    <Text size="15px" numberOfLines={2}>
                        {event.title}
                    </Text>
                    <Text color="#ddd">{event.date}</Text>
                    <Text color="#ddd" size="10px" numberOfLines={2}>
                        {event.description}
                    </Text>
                </Data>
            </Event>
        );
    }
    return (
        <Container>
            <BackButton action={() => navigation.goBack()} />
            <Events
                data={events}
                renderItem={({item}) => renderEvent(item)}
                keyExtractor={(item) => item.eventKey}
            />
        </Container>
    );
};

export default EventsList;
