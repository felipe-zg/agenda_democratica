import React from 'react';
import {View} from 'react-native';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
// import { Container } from './styles';

const EventList = ({route, navigation}) => {
    const {events} = route.params;
    return (
        <Container>
            <BackButton title="voltar" action={() => navigation.goBack()} />
            <Text>{events.length}</Text>
        </Container>
    );
};

export default EventList;
