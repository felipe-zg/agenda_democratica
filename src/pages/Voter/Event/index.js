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
    const [address, setAddress] = useState(null);
    const {event, uid} = route.params;

    useEffect(() => {
        async function getAddress() {
            await database()
                .ref(`addresses/${uid}`)
                .orderByChild('addressKey')
                .equalTo(event.address)
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            setAddress(childSnapshot);
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
                    <Text>{address.city}</Text>
                    <Text>{address.number}</Text>
                </InfoView>
            )}
            {!address && (
                <InfoView>
                    <Text>carregando endereço...</Text>
                </InfoView>
            )}
        </Container>
    );
};

export default Event;
