import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import database from '@react-native-firebase/database';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Event from '../../../components/Event';
import Text from '../../../components/Text';
import {Events} from './styles';

const EventList = ({route, navigation}) => {
    const {uid} = route.params;
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function getEvents() {
            var returnedEvents = [];
            await database()
                .ref(`events/${uid}`)
                .orderByChild('date')
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            returnedEvents = [
                                ...returnedEvents,
                                childSnapshot.val(),
                            ];
                        });
                    }
                });
            setEvents(returnedEvents);
        }
        if (!events) {
            getEvents();
        }
    });

    return (
        <Container>
            <BackButton title="voltar" action={() => navigation.goBack()} />
            <Events
                data={events}
                renderItem={({item}) => (
                    <Event
                        event={item}
                        callback={() =>
                            navigation.navigate('EventDetailsScreen', {
                                event: item,
                            })
                        }
                    />
                )}
                keyExtractor={(item) => item.eventKey}
            />
        </Container>
    );
};

export default EventList;
