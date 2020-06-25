import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Photo = styled.Image`
    width: 100px;
    height: 100px;
    margin: 10px 20px;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const InfoView = styled.View`
    padding: 10px;
    background: ${(props) => props.background || '#1c1c1c'};
`;

export const Touch = styled.TouchableOpacity`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background: ${(props) => props.background};
    align-items: center;
    justify-content: center;
    margin: 10px;
`;
