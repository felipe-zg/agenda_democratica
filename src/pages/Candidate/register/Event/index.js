import React from 'react';
import {View} from 'react-native';

import Container from '../../../../components/Container';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
// import { Container } from './styles';

const Event = ({navigation}) => {
    return (
        <Container>
            <Text>Cadastre um novo evento</Text>
            <Button
                title="Cadastrar"
                callback={() => navigation.replace('CandidateDashboardScreen')}
            />
        </Container>
    );
};

export default Event;
