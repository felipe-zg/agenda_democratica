import React from 'react';
import {View} from 'react-native';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
// import { Container } from './styles';

const Event = ({route, navigation}) => {
    const {event} = route.params;
    return (
        <Container>
            <BackButton title="voltar" action={() => navigation.goBack()} />
            <Text>{event.title}</Text>
        </Container>
    );
};

export default Event;
