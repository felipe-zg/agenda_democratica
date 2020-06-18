import styled from 'styled-components/native';

export default styled.View`
    flex-direction: row;
    align-items: center;
    background: #363636;
    margin-bottom: 10px;
    border-radius: 5px;
    border: ${(props) => props.border};
`;
