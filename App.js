import React from 'react';
import './global'
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import {LogBox, StatusBar} from 'react-native';
import LMLoading from './src/component/common/LMLoading';
import RootStore from './src/module/redux/RootStore';
import ApplicationNavigator from './src/module/navigation/ApplicationNavigator';
import LMSelect from './src/component/common/LMSelect';
enableScreens();
LogBox.ignoreLogs(['Warning: Cannot']);
LogBox.ignoreLogs(['component']);
LogBox.ignoreLogs(['Clipboard']);
LogBox.ignoreLogs(['RCTUI']);
LogBox.ignoreLogs(['[auth/p']);
LogBox.ignoreLogs(['[User cancelled the login process']);
LogBox.ignoreLogs(['Require cycles are allowed']);
LogBox.ignoreLogs(['Setting a timer for a long']);
LogBox.ignoreLogs(['formState.isValid']);

export default function App() {
    return (
        <Provider store={RootStore}>
            <StatusBar hidden={false} backgroundColor={'#ffff'} barStyle={'dark-content'}/>
            <ApplicationNavigator/>
            <LMLoading ref={(ref) => LMLoading.setRef(ref)}/>
            <LMSelect ref={(ref) => LMSelect.setRef(ref)}/>
        </Provider>
    );
};

