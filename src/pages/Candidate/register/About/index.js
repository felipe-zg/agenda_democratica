import React from 'react';

import Container from '../../../../components/Container';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
// import { Container } from './styles';

const About = ({navigation}) => {
    return (
        <Container>
            <Text>Fale um pouco sobre você</Text>
            <Button
                title="Próximo"
                callback={() =>
                    navigation.replace('CandidateGovernmentPlanRegisterScreen')
                }
            />
        </Container>
    );
};

export default About;
