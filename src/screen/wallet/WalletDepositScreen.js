import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-community/clipboard';
import Copy from '../../component/icon/Copy';

export default function WalletDepositScreen({navigation, route}) {
    const {activeWallet} = useSelector(state => state.WalletReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    useEffect(async () => {

    }, []);
    const onRefresh = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMText style={styles.headerTitle}>{language.receive}</LMText>
                <LMTouchableOpacity style={styles.drawer} onPress={() => {
                    navigation.goBack();
                }}>
                    <Exit/>
                </LMTouchableOpacity>
            </View>
            <ScrollView
                style={styles.content}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <QRCode
                    value={activeWallet.address}
                    logo={require('../../../assets/img/icon.png')}
                    size={280}
                />
                <View style={styles.addressContainer}>
                    <LMTouchableOpacity onPress={() => {
                        Clipboard.setString(activeWallet.address);
                    }} style={{justifyContent: 'center'}}>
                        <LMText style={styles.addressText}>{activeWallet.address}<Copy color={Theme.colors.alternativeTextColor}/></LMText>
                    </LMTouchableOpacity>
                </View>

            </ScrollView>
            <View style={styles.buttonContainer}>
                <LMButton label={language.share}/>
            </View>
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
        paddingTop: 30

    },
    sectionTitle: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400',
        marginBottom: 10
    },

    buttonContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    addressContainer: {
        marginTop: 30
    },
    addressText: {
        fontSize: 15,
        color: Theme.colors.alternativeTextColor,
        textAlign: 'center'
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
