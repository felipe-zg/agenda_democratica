import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Loads
import VerifyUser from './pages/Load/verifyUser';
import LoadCandidate from './pages/Load/loadCandidate';
import LoadVoter from './pages/Load/loadVoter';

import SelectUser from './pages/SelectUser';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

//Candidate register pages
import MayorRegister from './pages/candidate/register/Mayor';
import CandidateEventRegister from './pages/candidate/register/Event';
import CandidateAddressRegister from './pages/candidate/register/Address';

//Candidate dashboard pages
import CandidateDashboardMenu from './pages/candidate/dashboard/Dashboard';
import AddressesList from './pages/candidate/dashboard/AddressesList';
import EventsList from './pages/candidate/dashboard/EventsList';
import GovernmentPlan from './pages/candidate/dashboard/GovernmentPlan';
import Profile from './pages/candidate/dashboard/Profile';
import Posts from './pages/candidate/dashboard/Posts';

//Voter pages
import VoterRegister from './pages/Voter/Register';
import VoterHome from './pages/Voter/Home';
import CandidateDetails from './pages/Voter/Candidate';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="VerifyUserScreen"
                headerMode="none">
                <Stack.Screen name="VerifyUserScreen" component={VerifyUser} />
                <Stack.Screen
                    name="CandidateLoadScreen"
                    component={LoadCandidate}
                />
                <Stack.Screen name="VoterLoadScreen" component={LoadVoter} />
                <Stack.Screen name="SelectUserScreen" component={SelectUser} />
                <Stack.Screen name="SignInScreen" component={SignIn} />
                <Stack.Screen name="SignUpScreen" component={SignUp} />
                <Stack.Screen
                    name="MayorRegisterScreen"
                    component={MayorRegister}
                />
                <Stack.Screen
                    name="CandidateEventRegisterScreen"
                    component={CandidateEventRegister}
                />
                <Stack.Screen
                    name="CandidateAddressRegisterScreen"
                    component={CandidateAddressRegister}
                />
                <Stack.Screen
                    name="CandidateDashboardScreen"
                    component={CandidateDashboardMenu}
                />
                <Stack.Screen
                    name="CandidateAddressesListScreen"
                    component={AddressesList}
                />
                <Stack.Screen
                    name="CandidateEventsListScreen"
                    component={EventsList}
                />
                <Stack.Screen
                    name="CandidateGovernmentPlanScreen"
                    component={GovernmentPlan}
                />
                <Stack.Screen
                    name="CandidateProfileScreen"
                    component={Profile}
                />
                <Stack.Screen name="CandidatePostsScreen" component={Posts} />
                <Stack.Screen
                    name="VoterRegisterScreen"
                    component={VoterRegister}
                />
                <Stack.Screen name="VoterHomeScreen" component={VoterHome} />
                <Stack.Screen
                    name="CandidateDetailsScreen"
                    component={CandidateDetails}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
