import styled from 'styled-components/native';

export const PickerView = styled.View`
    margin-bottom: 10px;
    border-radius: 5px;
    background: #363636;
`;

export const MultilineInput = styled.TextInput.attrs({
    textAlignVertical: 'top',
    placeholderTextColor: '#e3e3e3',
})`
    color: #e3e3e3;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: #363636;
    border: ${(props) => props.border};
    height: 200px;
`;
