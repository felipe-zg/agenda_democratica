import styled from 'styled-components/native';

export const Header = styled.View`
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #ddd;
    padding: 10px 0;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) => props.align || 'center'};
`;

export const Photo = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin: 10px;
`;

export const PostInput = styled.TextInput.attrs({
    placeholderTextColor: '#e3e3e3',
    textAlignVertical: 'top',
})`
    color: #e3e3e3;
    padding: 10px 10px;
    border-radius: ${(props) => props.borderRadius};
    background: #363636;
    border: ${(props) => props.border || 'none'};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

export const Touch = styled.TouchableOpacity`
    padding: 10px;
`;

export const PostOptions = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    margin-top: 10px;
`;

export const PostsList = styled.FlatList``;

export const PostPhoto = styled.Image`
    height: 320px;
`;
