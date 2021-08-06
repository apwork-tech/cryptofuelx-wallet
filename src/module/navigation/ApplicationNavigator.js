import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import DrawerNavigator from './DrawerNavigator';
import {NetworkAction} from '../../persistence/network/NetworkAction';
import {LanguageAction} from '../../persistence/language/LanguageAction';
import LMImage from '../../component/common/LMImage';
import LMUtil from '../../util/LMUtil';

function ApplicationNavigator() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(NetworkAction.list());
        dispatch(NetworkAction.getActiveNetwork()).then(async () => {
            dispatch(LanguageAction.set()),
                await LMUtil.sleep(1000);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <LMImage source={require('../../../assets/img/icon.png')} style={{width: 90, height: 90}}/>
            </View>
        )

    }
    return (
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>

    );
}

export default ApplicationNavigator;
