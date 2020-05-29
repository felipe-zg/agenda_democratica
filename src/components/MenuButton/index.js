import React from 'react';
import {View} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Touch, TitleView, ArrowView, Text} from './styles';

const MenuButton = ({title, Icon, iconName, iconColor, callBack}) => {
    return (
        <Touch onPress={callBack}>
            <TitleView>
                <Icon name={iconName} size={30} color={iconColor} />
                <Text numberOfLines={1}>{title}</Text>
            </TitleView>
            <ArrowView>
                <MaterialIcon
                    name="keyboard-arrow-right"
                    size={30}
                    color="#fff"
                />
            </ArrowView>
        </Touch>
    );
};

export default MenuButton;
