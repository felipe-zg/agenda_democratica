import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';

import Routes from './routes';

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor="#1c1c1c" barStyle="light-content" />
            <Routes />
        </Provider>
    );
}
