import styled from 'styled-components/native';

export default styled.TextInput.attrs({
    placeholderTextColor: '#e3e3e3',
})`
    color: #e3e3e3;
    padding: 10px 10px;
    margin-bottom: ${(props) => props.marginBottom || '10px'};
    border-radius: 5px;
    background: #363636;
    border: ${(props) => props.border};
    width: ${(props) => props.width || '100%'};
`;
