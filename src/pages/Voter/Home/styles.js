import styled from 'styled-components/native';
import {View} from 'react-native';

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-color: #ddd;
    border-bottom-width: 0.5px;
`;
export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const CandidatesView = styled.View`
    padding: 20px 0 0 0;
    margin-bottom: 15px;
    background: #363636;
`;

export const CandidatesRow = styled.ScrollView`
    flex-direction: row;
    padding: 10px;
`;

export const Candidate = styled.ImageBackground`
    width: 120px;
    height: 200px;
    border: 1px solid #00f;
    border-radius: 10px;
    margin: 0 5px;
    justify-content: flex-end;
    overflow: hidden;
`;

export const CandidateName = styled.View`
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    align-items: center;
`;
