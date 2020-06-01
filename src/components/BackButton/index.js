import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Button, Header} from './styles';
import Text from '../Text';

export default function ArrowBack({action, title}) {
    return (
        <Header>
            <Button onPress={action}>
                <Icon name="arrow-back" size={35} color="#fff" />
            </Button>
            <Text>{title}</Text>
        </Header>
    );
}
