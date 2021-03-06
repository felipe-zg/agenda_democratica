import styled from 'styled-components/native';

export const Container = styled.View``;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const EditInput = styled.TextInput`
    width: 85%;
    color: #fff;
    padding: 0 10px 5px 10px;
    border-style: solid;
    border-bottom-color: ${(props) => props.color};
    border-bottom-width: ${(props) => props.width};
`;

export const Touch = styled.TouchableOpacity`
    padding: 0 10px;
`;
