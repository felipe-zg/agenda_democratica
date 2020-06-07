import styled from 'styled-components/native';

export const Addresses = styled.FlatList`
    padding: 10px;
`;

export const Address = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    background: #363636;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const IconTouch = styled.TouchableOpacity`
    padding: 2px;
    align-items: center;
`;
