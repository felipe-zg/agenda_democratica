import styled from 'styled-components/native';

export const Touch = styled.TouchableOpacity`
    padding: 10px;
    margin-top: 30px
    border-radius: 10px;
    background: ${(props) => props.background};
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
`;
