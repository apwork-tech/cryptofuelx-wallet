import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import LMTextInput from '../../component/common/LMTextInput';
import Exit from '../../component/icon/Exit';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import LMLoading from '../../component/common/LMLoading';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import {Root} from 'popup-ui';
import LMNotification from '../../component/common/LMNotification';
import LMUtil from '../../util/LMUtil';

export default function ImportWalletScreen({navigation}) {
    const {language} = useSelector(state => state.LanguageReducer);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const dispatch = useDispatch();
    useEffect(async () => {

    }, []);
    const schema = yup.object().shape({
        name: yup.string().required(language.walletName + ' ' + language.isARequiredField),
        wif: yup.string().required(language.importData + ' ' + language.isARequiredField),
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async ({name, wif}) => {
        LMLoading.show();
        await LMUtil.sleep(500);
        dispatch(WalletAction.importWallet({
            name: name,
            mnemonic: wif,
            wif: wif,
            network: activeNetwork
        })).then((data) => {
            LMLoading.hide();
            if (typeof data == 'string') {
                let error = '';
                if (data == 'invalid') {
                    error = language.yourDataIsIncorrect
                } else if (data == 'imported') {
                    error = language.yourWalletHasAlreadyImported
                }
                LMNotification.error({
                    title: language.error,
                    text: error,
                })
            } else {
                navigation.navigate("WifScreen", {key: 'mnemonic',value : wif, label: language.mnemonic, register: true});
            }
        })
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.importWallet}</LMText>
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

                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <LMTextInput
                                label={language.importData}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                error={errors['wif']}
                                placeholder={language.wif}
                                multiline={true}
                                style={{height: 200}}
                            />
                        )}
                        name="wif"
                        defaultValue=""
                    />
                    <LMText style={{marginTop: 5}}>{language.pleaseEnterSeedWords}</LMText>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <LMButton label={language.import} onPress={handleSubmit(onSubmit)}/>
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
