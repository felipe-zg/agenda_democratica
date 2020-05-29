import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const LogoView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'cover',
})`
    height: 150px;
    width: 100px;
`;

export const FormView = styled.View`
    flex: 2;
    padding: 20px;
`;

export const SignUpLink = styled.TouchableOpacity`
    align-self: center;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
`;

export const Text = styled.Text`
    color: #fff;
    font-size: 10px;
`;
