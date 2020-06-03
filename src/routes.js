import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectUser from './pages/SelectUser';

import SignIn from './pages/SignIn';

//Candidate register pages
import CandidateSignUp from './pages/candidate/register/SignUp';
import MayorRegister from './pages/candidate/register/Mayor';
import CandidateEventRegister from './pages/candidate/register/Event';

//Candidate dashboard
import CandidateDashboardMenu from './pages/candidate/dashboard/Dashboard';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SelectUserScreen"
                headerMode="none">
                <Stack.Screen name="SelectUserScreen" component={SelectUser} />
                <Stack.Screen name="SignInScreen" component={SignIn} />
                <Stack.Screen
                    name="CandidateSignUpScreen"
                    component={CandidateSignUp}
                />
                <Stack.Screen
                    name="MayorRegisterScreen"
                    component={MayorRegister}
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
