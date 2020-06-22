import React from 'react';
import {View} from 'react-native';

import Container from '../../../components/Container';
import BackButton from '../../../components/BackButton';
import Text from '../../../components/Text';
// import { Container } from './styles';

export default function Candidate({route, navigation}) {
    const {candidate} = route.params;

    return (
        <Container>
            <BackButton action={() => navigation.goBack()} />
            <Text>{candidate.name}</Text>
            <Text>{candidate.number}</Text>
        </Container>
    );
}
