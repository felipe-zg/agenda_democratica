import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    addFavoriteEvent,
    deleteFavoriteEvent,
} from '../../../store/modules/FavoriteEvents/actions';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
import {Photo, Row, InfoView, Touch} from './styles';

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
    const {event, uid, isFave} = route.params;
    const [isFavorite, setIsFavorite] = useState(isFave);
    const dispatch = useDispatch();

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

    function renderAddress() {
        return <Text>{address.street}</Text>;
    }

    async function handleFollow() {
        const voter = auth().currentUser;
        if (isFavorite) {
            database()
                .ref(`favoriteEvents/${voter.uid}`)
                .child(event.eventKey)
                .remove()
                .then(() => {
                    dispatch(deleteFavoriteEvent(event.eventKey));
                });
        } else {
            database()
                .ref(`favoriteEvents/${voter.uid}`)
                .child(event.eventKey)
                .set(event.eventKey)
                .then(() => {
                    dispatch(addFavoriteEvent(event.eventKey));
                });
        }
        setIsFavorite(!isFavorite);
    }

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
            <InfoView background="#191919">
                {address && renderAddress()}
                {!address && <Text>carregando endereço...</Text>}
            </InfoView>

            <Row>
                <Touch background="#00f">
                    <Icon name="car-hatchback" color="#fff" size={35} />
                </Touch>
                <Touch
                    background={isFavorite ? '#f00' : '#00f'}
                    onPress={handleFollow}>
                    <Icon name="cards-heart" color="#fff" size={35} />
                </Touch>
            </Row>
        </Container>
    );
};

export default Event;
