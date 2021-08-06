import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'popup-ui';
import LMImage from '../../component/common/LMImage';
import LMButton from '../../component/common/LMButton';
import LMTextInput from '../../component/common/LMTextInput';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import LMNotification from '../../component/common/LMNotification';
import {ContactAction} from '../../persistence/contact/ContactAction';

export default function UpdateContactScreen({navigation, route}) {
    const {item} = route.params;
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        name: yup.string().required(language.contactName + ' ' + language.isARequiredField),
        address: yup.string().required(language.walletAddress + ' ' + language.isARequiredField).isAddressValid(language.addressIsIncorrect, activeNetwork.value)
    });
    const {control, handleSubmit, setValue, errors} = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(async () => {

    }, []);

    const onSubmit = async ({name, address}) => {
        dispatch(ContactAction.update({
            contact: {name, address, id: item.id},
            network: activeNetwork
        })).then(({success}) => {
            if (!success) {
                LMNotification.error({
                    title: language.error,
                    text: language.theContactHasAlreadyImported,
                });
            } else {
                LMNotification.popupSuccess({
                    buttonText: language.ok,
                    callback: () => {
                        navigation.goBack();
                    },
                    title: language.success,
                    message: language.contactHasBeenUpdated
                })
            }


        })
    };
    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <LMText style={styles.headerTitle}>{language.contact}</LMText>
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
                                label={language.contactName}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                error={errors['name']}
                                placeholder={language.contactName}
                            />
                        )}
                        name="name"
                        defaultValue={item.name}
                    />
                    <Controller
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <LMTextInput
                                label={language.walletAddress}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                error={errors['address']}
                                placeholder={language.walletAddress}
                            />
                        )}
                        name="address"
                        defaultValue={item.address}
                    />
                    <View style={styles.contactContainer}>
                        <LMTouchableOpacity style={styles.send} onPress={() => {
                            navigation.navigate('WalletScannerScreen', {
                                screenName: 'UpdateContactScreen',
                                onScanSuccess: async (address) => {
                                    setValue('address', address, {shouldValidate: true});
                                }
                            });
                        }}>
                            <View style={styles.buttonText}>
                                <LMText style={styles.receiveText}>{language.scan}</LMText>
                            </View>

                            <View style={styles.buttonIcon}>
                                <LMImage source={require('../../../assets/img/scan.png')} style={styles.receiveIcon}/>
                            </View>
                        </LMTouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <LMButton label={language.remove} onPress={() => {
                        dispatch(ContactAction.remove({
                            contact: {address: item.address},
                            network: activeNetwork
                        })).then(() => {
                            LMNotification.popupSuccess({
                                title: language.complete,
                                message: language.contactHasBeenRemoved,
                                buttontext: language.ok,
                                callback: () => {
                                    navigation.goBack();
                                },
                            });

                        })
                    }} style={{
                        marginBottom: 5,
                        backgroundColor: 'white'
                    }} labelStyle={{color: Theme.colors.foregroundColor}}/>
                    <LMButton label={language.save} onPress={handleSubmit(onSubmit)}/>
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
    contactList: {
        marginTop: 10
    },
    buttonContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    contactContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    contact: {
        width: 100,
        height: 40,
        borderRadius: 10,
    },
    receive: {
        width: 130,
        height: 55,
        backgroundColor: Theme.colors.ballOutgoingExpired,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
    },
    send: {
        width: 130,
        height: 55,
        backgroundColor: Theme.colors.ballOutgoingExpired,
        borderRadius: 20,
        flexDirection: 'row',
    },
    buttonIcon: {
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    receiveIcon: {width: 29, height: 29, transform: [{rotate: '180deg'}]},
    receiveText: {color: Theme.colors.foregroundColor, fontSize: 16},
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
