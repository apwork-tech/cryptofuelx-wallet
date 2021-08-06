import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LMImage from '../../component/common/LMImage';

export default function WalletScannerScreen({navigation, route}) {
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    const {screenName, onScanSuccess} = route.params;
    const onSuccess = async e => {
        navigation.pop();
        await onScanSuccess(e.data);
        navigation.navigate(screenName);
    };
    useEffect(async () => {
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMText style={styles.headerTitle}>{language.scan}</LMText>
                <LMTouchableOpacity style={styles.drawer} onPress={async () => {
                    navigation.goBack();
                }}>
                    <Exit/>
                </LMTouchableOpacity>
            </View>
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                fadeIn={false}
                reactivate={false}
                showMarker={true}
                topContent={
                    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                        <LMImage source={require('../../../assets/img/icon.png')} style={{width: 90, height: 90}}/>
                    </View>
                }
            />
        </SafeAreaView>
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
    sectionTitle: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400',
        marginBottom: 10
    },
    walletType: {
        marginTop: 10
    },
    walletTypeItem: {
        width: '100%',
        backgroundColor: Theme.colors.buttonDisabledBackgroundColor,
        height: 60,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: 'row'
    },
    walletTypeItemIcon: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    walletTypeItemBody: {
        flex: 1,
        justifyContent: 'center'
    },
    walletTypeTitle: {
        color: Theme.colors.newBlue, fontWeight: 'bold', fontSize: 18,
    },
    walletTypeDesc: {
        color: Theme.colors.alternativeTextColor,
        fontSize: 13,
        fontWeight: '500',
    },
    buttonContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
