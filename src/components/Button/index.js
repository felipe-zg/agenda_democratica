import React from 'react';
import {View} from 'react-native';

import {Touch, Text} from './styles';

const Button = ({background, title, callback}) => {
    return (
        <Touch background={background || '#00f'} onPress={callback}>
            <Text>{title}</Text>
        </Touch>
    );
};

export default Button;
