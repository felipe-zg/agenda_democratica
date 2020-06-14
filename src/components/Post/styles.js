import styled from 'styled-components/native';

export const Container = styled.View`
    border-bottom-color: #ddd;
    border-bottom-width: 0.5px;
`;

export const PostHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px 15px 15px;
`;

export const Profile = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ProfilePhoto = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 20px;
`;

export const Touch = styled.TouchableOpacity`
    padding: 0 0 0 10px;
`;

export const PostPhoto = styled.Image`
    height: 500px;
    margin-bottom: 10px;
`;
