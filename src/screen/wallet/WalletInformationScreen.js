import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import LMTextInput from '../../component/common/LMTextInput';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import LMNotification from '../../component/common/LMNotification';
import {CommonActions} from '@react-navigation/native';

export default function WalletInformationScreen({navigation}) {
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const {activeWallet} = useSelector(state => state.WalletReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    useEffect(async () => {

    }, []);
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.wallet}</LMText>
                    <LMTouchableOpacity style={styles.drawer} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Exit/>
                    </LMTouchableOpacity>
                </View>
                <ScrollView style={styles.content}>
                    <LMTextInput
                        label={language.walletName}
                        value={activeWallet.name}
                        editable={false}
                    />
                    <LMTextInput
                        label={language.walletAddress}
                        value={activeWallet.address}
                        editable={false}
                    />
                    <LMTextInput
                        label={language.type}
                        value={activeWallet.type}
                        editable={false}
                    />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <LMButton
                        label={language.xpub}
                        style={{marginBottom: 5, backgroundColor: 'white'}}
                        labelStyle={{color: Theme.colors.foregroundColor}}
                        onPress={() => {
                            navigation.navigate('WifScreen', {key: 'wif', label: language.publicKey});
                        }}
                    />
                    <LMButton
                        label={language.backup}
                        style={{marginBottom: 5, backgroundColor: 'white'}}
                        labelStyle={{color: Theme.colors.foregroundColor}}
                        onPress={() => {
                            navigation.navigate('WifScreen', {key: 'mnemonic', label: language.mnemonic});
                        }}
                    />
                    <LMButton style={{backgroundColor: Theme.colors.redText}} label={language.remove} onPress={() => {
                        dispatch(WalletAction.remove({
                            wallet: activeWallet,
                            network: activeNetwork
                        })).then(() => {
                            LMNotification.popupSuccess({
                                title: language.complete,
                                message: language.walletHasBeenRemoved,
                                buttontext: language.ok,
                                callback: () => {
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{name: "WalletScreen"}]
                                        })
                                    );
                                },
                            });
                        })
                    }}/>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
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
    },
    sectionTitle: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400',
        marginBottom: 10,
    },
    walletType: {
        marginTop: 10,
    },
    walletTypeItem: {
        width: '100%',
        backgroundColor: Theme.colors.buttonDisabledBackgroundColor,
        height: 60,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    walletTypeItemIcon: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingBottom: 10,
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
