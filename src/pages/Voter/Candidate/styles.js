import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Header = styled.View`
    align-items: center;
    padding: 20px 0;
`;

export const Photo = styled.Image`
    height: 150px;
    width: 150px;
    border-radius: 75px;
`;

export const Info = styled.View`
    flex-direction: row;
    padding: 10px;
`;

export const Label = styled.View`
    width: ${(Dimensions.get('window').width / 10) * 2.5}px;
`;

export const Value = styled.View`
    width: ${(Dimensions.get('window').width / 10) * 7}px;
    padding-left: 20px;
`;

export const Link = styled.TouchableOpacity`
    align-self: center;
`;
