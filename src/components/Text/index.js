import styled from 'styled-components/native';

export default styled.Text`
    color: ${(props) => props.color || '#fff'};
    font-size: ${(props) => props.size || '12px'};
    font-weight: ${(props) => props.weight || 'normal'};
    padding: ${(props) => props.padding ?? '0'};
    text-align: justify;
`;
