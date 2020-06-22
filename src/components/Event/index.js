import React from 'react';
import {View} from 'react-native';

import Text from '../Text';
import {EventItem, Photo, Data} from './styles';

import meeting from '../../assets/meeting.png';
import car from '../../assets/car.png';
import rally from '../../assets/rally.png';
import walk from '../../assets/walk.png';

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

const Event = ({event, callback}) => {
    return (
        <EventItem onPress={() => callback()}>
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
        </EventItem>
    );
};

export default Event;
