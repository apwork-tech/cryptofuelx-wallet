import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import LMTextInput from '../../component/common/LMTextInput';
import Exit from '../../component/icon/Exit';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {CommonActions} from '@react-navigation/native';
import {useBackHandler} from '@react-native-community/hooks';

export default function WifScreen({navigation, route}) {
    const {key, label, register,value} = route.params;
    const {language} = useSelector(state => state.LanguageReducer);
    const {activeWallet} = useSelector(state => state.WalletReducer);
    useBackHandler(() => {
        if (register == true) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: "WalletScreen"}]
                })
            );
        }
        return false;
    })
    useEffect(async () => {

    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMText style={styles.headerTitle}>{language.walletExport}</LMText>
                {
                    register != true &&
                    <LMTouchableOpacity style={styles.drawer} onPress={() => {
                        navigation.goBack();
                    }}>

                        <Exit/>
                    </LMTouchableOpacity>
                }

            </View>
            <View style={styles.content}>
                <LMText>
                    {language.writeItSomewhereSafe}
                </LMText>
                <View style={[styles.content, {width: '100%', justifyContent: 'center'}]}>
                    <QRCode
                        value={activeWallet.address}
                        logo={require('../../../assets/img/icon.png')}
                        size={280}
                    />
                    <View style={{marginTop: 50, width: '100%'}}>
                        <LMTextInput
                            label={label}
                            value={activeWallet[key] || value}
                            placeholder={language.wif}
                            multiline={true}
                            style={{height: 100, fontSize: 18}}
                            editable={false}
                        />
                    </View>

                </View>
            </View>
            {
                register == true &&
                <View style={styles.buttonContainer}>
                    <LMButton label={language.greatExploreNow} onPress={() => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: "WalletScreen"}]
                            })
                        );
                    }}/>
                </View>
            }
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
        flex: 1,
        alignItems: 'center',
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
        justifyContent: 'center',

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
        paddingBottom: 10
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
