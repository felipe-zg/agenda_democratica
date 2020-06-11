import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';

export default styled(TextInputMask).attrs({
    placeholderTextColor: '#e3e3e3',
})`
    color: #e3e3e3;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #363636;
    border: ${(props) => props.border};
`;
