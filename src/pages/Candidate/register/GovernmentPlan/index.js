import React from 'react';
import {View} from 'react-native';

import Container from '../../../../components/Container';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';

// import { Container } from './styles';

const GovernmentPlan = ({navigation}) => {
    return (
        <Container>
            <Text>Cadastre seu plane de governo</Text>
            <Button
                title="Próximo"
                callback={() => navigation.replace('CandidateDashboardScreen')}
            />
        </Container>
    );
};

export default GovernmentPlan;
