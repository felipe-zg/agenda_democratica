import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectUser from './pages/SelectUser';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SelectUserScreen"
                headerMode="none">
                <Stack.Screen name="SelectUserScreen" component={SelectUser} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
