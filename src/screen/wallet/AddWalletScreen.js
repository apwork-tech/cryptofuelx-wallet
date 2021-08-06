import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import LMImage from '../../component/common/LMImage';
import LMTextInput from '../../component/common/LMTextInput';
import Exit from '../../component/icon/Exit';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import LMLoading from '../../component/common/LMLoading';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import {Root} from 'popup-ui';
import LMUtil from '../../util/LMUtil';

export default function AddWalletScreen({navigation}) {
    const type = {
        BITCOIN: 'BITCOIN',
        LIGHTNING: 'LIGHTNING',
        VAULT: 'VAULT'
    };
    const [walletType, setWalletType] = useState(type.BITCOIN);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    useEffect(async () => {

    }, []);
    const onRefresh = () => {

    };
    const schema = yup.object().shape({
        name: yup.string().required(language.walletName + ' ' + language.isARequiredField)
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async ({name}) => {
        LMLoading.show();
        await LMUtil.sleep(500);
        dispatch(WalletAction.add({
            name: name,
            network: activeNetwork
        })).then((data) => {
            LMLoading.hide();
            navigation.navigate("WifScreen", {key: 'mnemonic',value:data.mnemonic, label: language.mnemonic, register: true});
        })
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.addWallet}</LMText>
                    <LMTouchableOpacity style={styles.drawer} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Exit/>
                    </LMTouchableOpacity>
                </View>
                <ScrollView style={styles.content}>
                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <LMTextInput
                                label={language.walletName}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                error={errors['name']}
                                placeholder={language.enterYourWallet}
                            />
                        )}
                        name="name"
                        defaultValue=""
                    />
                    <View style={styles.walletType}>
                        <LMText style={styles.sectionTitle}>{language.type}</LMText>
                        <LMTouchableOpacity style={[styles.walletTypeItem, walletType == type.BITCOIN ? {
                            borderWidth: 1,
                            borderColor: Theme.colors.newBlue
                        } : {}]} onPress={() => {
                            setWalletType(type.BITCOIN)
                        }}>
                            <View style={styles.walletTypeItemIcon}>
                                <LMImage source={require('../../../assets/img/addWallet/bitcoin.png')} style={{
                                    width: 32,
                                    height: 32
                                }}/>
                            </View>
                            <View style={styles.walletTypeItemBody}>
                                <LMText style={styles.walletTypeTitle}>{language.bitcoin}</LMText>
                                <LMText style={styles.walletTypeDesc}>{language.simpleAndPowerful}</LMText>
                            </View>
                        </LMTouchableOpacity>
                        <LMTouchableOpacity style={[styles.walletTypeItem, walletType == type.LIGHTNING ? {
                            borderWidth: 1,
                            borderColor: Theme.colors.lnborderColor
                        } : {}]} onPress={() => {
                            setWalletType(type.LIGHTNING)
                        }}>
                            <View style={styles.walletTypeItemIcon}>
                                <LMImage source={require('../../../assets/img/addWallet/lightning.png')} style={{
                                    width: 32,
                                    height: 32
                                }}/>
                            </View>
                            <View style={styles.walletTypeItemBody}>
                                <LMText style={[styles.walletTypeTitle, {color: Theme.colors.lnborderColor}]}>{language.lightning}</LMText>
                                <LMText style={styles.walletTypeDesc}>{language.forSpendingWithInstantTransactions}</LMText>
                            </View>
                        </LMTouchableOpacity>
                        <LMTouchableOpacity style={[styles.walletTypeItem, walletType == type.VAULT ? {
                            borderWidth: 1,
                            borderColor: Theme.colors.foregroundColor
                        } : {}]} onPress={() => {
                            setWalletType(type.VAULT)
                        }}>
                            <View style={styles.walletTypeItemIcon}>
                                <LMImage source={require('../../../assets/img/addWallet/vault.png')} style={{
                                    width: 32,
                                    height: 32
                                }}/>
                            </View>
                            <View style={styles.walletTypeItemBody}>
                                <LMText style={[styles.walletTypeTitle, {color: Theme.colors.foregroundColor}]}>{language.vault}</LMText>
                                <LMText style={styles.walletTypeDesc}>{language.bestSecurity}</LMText>
                            </View>
                        </LMTouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <LMButton label={language.importWallet} style={{
                        marginBottom: 5,
                        backgroundColor: 'white'
                    }} labelStyle={{color: Theme.colors.foregroundColor}}
                        onPress={() => {
                            navigation.navigate("ImportWalletScreen");
                        }}
                    />
                    <LMButton label={language.create} onPress={handleSubmit(onSubmit)}/>
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
        paddingBottom: 10
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
