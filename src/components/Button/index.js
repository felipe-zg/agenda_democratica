import React from 'react';
import {View} from 'react-native';

import {Touch, Text} from './styles';

const Button = ({background, title, disabled, callback, testID}) => {
    return (
        <Touch
            testID={testID}
            background={background || '#00f'}
            disabled={disabled ?? false}
            onPress={callback}>
            <Text>{title}</Text>
        </Touch>
    );
};

export default Button;
