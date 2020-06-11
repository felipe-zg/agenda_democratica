import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Load from './pages/Load';
import SelectUser from './pages/SelectUser';
import SignIn from './pages/SignIn';

//Candidate register pages
import CandidateSignUp from './pages/candidate/register/SignUp';
import MayorRegister from './pages/candidate/register/Mayor';
import CandidateEventRegister from './pages/candidate/register/Event';
import CandidateAddressRegister from './pages/candidate/register/Address';

//Candidate dashboard
import CandidateDashboardMenu from './pages/candidate/dashboard/Dashboard';
import AddressesList from './pages/candidate/dashboard/AddressesList';
import EventsList from './pages/candidate/dashboard/EventsList';
import GovernmentPlan from './pages/candidate/dashboard/GovernmentPlan';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoadScreen" headerMode="none">
                <Stack.Screen name="LoadScreen" component={Load} />
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
