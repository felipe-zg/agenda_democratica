import React from 'react';
import {WebView} from 'react-native-webview';

import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import BackButton from '../../../../components/BackButton';
// import {  } from './styles';

const GovernmentPlan = ({navigation}) => {
    return (
        <Container>
            <BackButton action={() => navigation.goBack()} title="voltar" />
            <WebView source={{uri: 'http://felipezeba.netlify.com'}} />
        </Container>
    );
};

export default GovernmentPlan;
