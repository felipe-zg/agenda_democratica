import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import database from '@react-native-firebase/database';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
import Event from '../../../components/Event';
import {Header, Photo, Info, Label, Value, Link} from './styles';

export default function Candidate({route, navigation}) {
    const {candidate} = route.params;
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function getEvents() {
            var returnedEvents = [];
            await database()
                .ref(`events/${candidate.uId}`)
                .orderByKey()
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
            if (!events) {
                setEvents(returnedEvents);
            }
        }
        getEvents();
    });

    function renderInfo(label, value) {
        return (
            <Info>
                <Label>
                    <Text numberOfLines={1}>{label}:</Text>
                </Label>
                <Value>
                    <Text>{value}</Text>
                </Value>
            </Info>
        );
    }

    function renderEvents() {
        var max = 0;
        return events.map((event) => {
            if (max === 3) {
                return;
            } else {
                max++;
            }
            return (
                <Event
                    key={event.eventKey}
                    event={event}
                    callback={() =>
                        navigation.navigate('EventDetailsScreen', {
                            event,
                        })
                    }
                />
            );
        });
    }

    return (
        <Container>
            <ScrollView>
                <BackButton action={() => navigation.goBack()} />
                <Header>
                    <Photo source={{uri: candidate.photo}} />
                </Header>
                {renderInfo('Candidato', candidate.campaignName)}
                {renderInfo('Vice', candidate.viceName)}
                {renderInfo('Partido', candidate.party)}
                {renderInfo('Número', candidate.number)}
                {renderInfo('Sobre', candidate.about)}
                <Text padding="20px" size="18px">
                    Eventos
                </Text>
                {events && renderEvents()}
                {events.length > 1 && (
                    <Link
                        onPress={() =>
                            navigation.navigate('EventListScreen', {events})
                        }>
                        <Text>Ver mais...</Text>
                    </Link>
                )}
            </ScrollView>
        </Container>
    );
}
