import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {clearUser} from '../../../store/modules/Voter/actions';

import Container from '../../../components/Container';
import Text from '../../../components/Text';
import {
    Header,
    Photo,
    CandidatesView,
    CandidatesRow,
    Candidate,
    CandidateName,
    Row,
} from './styles';

const Home = ({navigation}) => {
    const voter = useSelector((state) => state.Voter);
    const [mayors, setMayors] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMayors() {
            var candidates = [];
            await database()
                .ref('candidates/mayor')
                .orderByKey()
                .once('value', (snapShot) => {
                    if (snapShot.val()) {
                        snapShot.forEach((childSnapshot) => {
                            candidates = [...candidates, childSnapshot.val()];
                        });
                    }
                });
            setMayors(candidates);
        }
        getMayors();
    });

    function handleSignOut() {
        auth()
            .signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'VerifyUserScreen'}],
                });
                dispatch(clearUser());
            });
    }

    function renderMayors() {
        return mayors.map((mayor) => {
            return (
                <TouchableOpacity
                    key={mayor.candidateKey}
                    onPress={() =>
                        navigation.navigate('CandidateDetailsScreen', {
                            candidate: mayor,
                        })
                    }>
                    <Candidate source={{uri: mayor.photo}}>
                        <CandidateName>
                            <Text numberOfLines={2}>{mayor.campaignName}</Text>
                        </CandidateName>
                    </Candidate>
                </TouchableOpacity>
            );
        });
    }
    function renderCityCouncilors() {}
    return (
        <Container>
            <Header>
                <Row>
                    <Photo source={{uri: voter.photo}} />
                    <Text padding="0 0 0 10px">{voter.name}</Text>
                </Row>
                <TouchableOpacity onPress={() => handleSignOut()}>
                    <Text>Sair</Text>
                </TouchableOpacity>
            </Header>
            <CandidatesView>
                <Text size="18px" padding="0 0 0 20px;">
                    Prefeitos
                </Text>
                {mayors && (
                    <CandidatesRow horizontal={true}>
                        {renderMayors()}
                    </CandidatesRow>
                )}
            </CandidatesView>
            <Text size="18px">Vereadores</Text>
            <CandidatesRow>{renderCityCouncilors()}</CandidatesRow>
        </Container>
    );
};

export default Home;
