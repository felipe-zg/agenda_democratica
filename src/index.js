import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#1c1c1c" barStyle="light-content" />
            <Routes />
        </>
    );
}
