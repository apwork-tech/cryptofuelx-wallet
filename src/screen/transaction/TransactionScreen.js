import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import WebView from 'react-native-webview';
import LMLoading from '../../component/common/LMLoading';
import {useBackHandler} from '@react-native-community/hooks'

export default function TransactionScreen({navigation, route}) {
    const {item} = route.params;
    const {language} = useSelector(state => state.LanguageReducer);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const dispatch = useDispatch();
    const webview = useRef();
    const [canGoBack, setCanGoBack] = useState(false);
    useBackHandler(() => {
        if (canGoBack) {
            webview.current.goBack();
        } else {
            navigation.goBack();
        }
        return true;
    })
    useEffect(() => {

    }, []);

    const onNavigationStateChange = webViewState => {
        setCanGoBack(webViewState.canGoBack);
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.transaction}</LMText>
                    <LMTouchableOpacity style={styles.drawer} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Exit/>
                    </LMTouchableOpacity>
                </View>
                <View style={styles.content}>
                    <WebView
                        ref={webview}
                        source={{uri: `${activeNetwork.explore}tx/${item.txid}`}}
                        originWhitelist={["*"]}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={true}
                        showsVerticalScrollIndicator={false}
                        onLoad={(syntheticEvent) => {
                            LMLoading.hide();
                        }}
                        onNavigationStateChange={onNavigationStateChange}
                    />
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Theme.colors.foregroundColor,
        paddingHorizontal: 4,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
