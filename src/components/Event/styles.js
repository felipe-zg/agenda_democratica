import styled from 'styled-components/native';

export const EventItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background: #363636;
`;

export const Photo = styled.Image`
    width: 80px;
    height: 80px;
    margin: 10px;
`;

export const Data = styled.View`
    width: auto;
    flex-shrink: 1;
`;
