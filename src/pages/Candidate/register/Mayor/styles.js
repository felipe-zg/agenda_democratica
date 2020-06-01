import styled from 'styled-components/native';

export const Form = styled.ScrollView`
    padding: 15px;
`;

export const ImagePickerTouch = styled.TouchableOpacity`
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 5px;
    align-items: center;
    justify-content: center;
`;

export const ButtonsView = styled.View`
    flex: 1;
    padding: 0 15px 30px 15px;
    justify-content: flex-end;
`;

export const AboutView = styled.View`
    flex: 2;
    margin-top: 20px;
`;

export const AboutInput = styled.TextInput.attrs({
    textAlignVertical: 'top',
    placeholderTextColor: '#e3e3e3',
})`
    border: 0.5px solid #00f;
    border-radius: 10px;
    height: 250px;
    color: #e3e3e3;
    padding: 2px 10px;
    margin-bottom: 30px;
`;

export const Photo = styled.Image.attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: 100%;
`;
