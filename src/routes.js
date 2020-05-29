import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectUser from './pages/SelectUser';

//Candidate register pages
import CandidateSignIn from './pages/Candidate/SignIn';
import CandidateSignUp from './pages/Candidate/register/SignUp';
import CandidateGovernmentPlanRegister from './pages/Candidate/register/GovernmentPlan';
import CandidateAboutRegister from './pages/Candidate/register/About';
import CandidateEventRegister from './pages/Candidate/register/Event';

import CandidateDashboardMenu from './pages/Candidate/dashboard/Dashboard';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SelectUserScreen"
                headerMode="none">
                <Stack.Screen name="SelectUserScreen" component={SelectUser} />
                <Stack.Screen
                    name="CandidateSignInScreen"
                    component={CandidateSignIn}
                />
                <Stack.Screen
                    name="CandidateSignUpScreen"
                    component={CandidateSignUp}
                />
                <Stack.Screen
                    name="CandidateGovernmentPlanRegisterScreen"
                    component={CandidateGovernmentPlanRegister}
                />
                <Stack.Screen
                    name="CandidateAboutRegisterScreen"
                    component={CandidateAboutRegister}
                />
                <Stack.Screen
                    name="CandidateEventRegisterScreen"
                    component={CandidateEventRegister}
                />
                <Stack.Screen
                    name="CandidateDashboardScreen"
                    component={CandidateDashboardMenu}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
