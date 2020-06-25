import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import database from '@react-native-firebase/database';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
import {Photo, Row, InfoView} from './styles';

import meeting from '../../../assets/meeting.png';
import car from '../../../assets/car.png';
import rally from '../../../assets/rally.png';
import walk from '../../../assets/walk.png';

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

const Event = ({route, navigation}) => {
    const {event} = route.params;
    const {uId} = route.params;
    const [address, setAddress] = useState(null);
    console.warn(uId);

    useEffect(() => {
        async function getAddress() {
            await database()
                .ref(`addresses/${uId}`)
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            console.warn(childSnapshot);
                        });
                    }
                });
        }
        if (!address) {
            getAddress();
        }
    });
    return (
        <Container>
            <BackButton title="voltar" action={() => navigation.goBack()} />
            <Row>
                <Photo source={getPhoto(event.category)} />
                <View>
                    <Text size="16px">{event.title}</Text>
                    <Text>{event.date}</Text>
                    <Text size="8px">{event.category}</Text>
                </View>
            </Row>
            <InfoView>
                <Text>{event.description}</Text>
            </InfoView>
            {address && (
                <InfoView>
                    <Text>{address.street}</Text>
                </InfoView>
            )}
        </Container>
    );
};

export default Event;
