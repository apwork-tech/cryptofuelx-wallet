import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Back from '../../component/icon/Back';
import MoreIcon from '../../component/icon/MoreIcon';
import LMImage from '../../component/common/LMImage';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import WalletDepositScreen from './WalletDepositScreen';
import Copy from '../../component/icon/Copy';
import Clipboard from '@react-native-community/clipboard';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import _ from 'lodash'
import LMUtil from '../../util/LMUtil';

export default function WalletDetailScreen({navigation}) {
    const {language} = useSelector(state => state.LanguageReducer);
    const {transactions} = useSelector(state => state.WalletReducer);
    const {activeWallet} = useSelector(state => state.WalletReducer);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(WalletAction.transactions({
            address: activeWallet.address
        }))
    }, []);
    const onRefresh = () => {
        setRefreshing(false);
        dispatch(WalletAction.list({address: activeWallet.address, network: activeNetwork}));
        dispatch(WalletAction.transactions({
            address: activeWallet.address
        })).then(() => {
            setRefreshing(false);
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#6CD9FC', '#44BEE5']} style={styles.headerBg}>
                <LMImage source={require('../../../assets/img/btc-shape.png')} style={styles.image}/>
            </LinearGradient>
            <View style={styles.header}>
                <LMTouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Back color={'white'}/>
                </LMTouchableOpacity>
                <LMTouchableOpacity style={styles.drawer} onPress={() => {
                    navigation.navigate("WalletInformationScreen");
                }}>
                    <MoreIcon color={'white'}/>
                </LMTouchableOpacity>
            </View>
            <View style={styles.walletInformation}>
                <View style={styles.walletBalance}>
                    <LMText style={styles.walletName}>{activeWallet.name}</LMText>
                    <LMText style={styles.walletBalanceLabel}>{activeWallet.balance} BTC</LMText>
                </View>
                <View style={styles.walletLatestTransaction}>
                    <LMTouchableOpacity onPress={() => {
                        Clipboard.setString(activeWallet.address);
                    }}>
                        <LMText style={styles.latestTransactionLabel}>{activeWallet.address}<Copy color={'white'}/></LMText>

                    </LMTouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <View style={styles.transactionList}>
                    <LMText style={styles.transactionTitle}>{language.transactions}</LMText>
                    {
                        _.map(transactions, function (transaction) {
                            return (
                                <LMTouchableOpacity style={styles.transactionItem} key={transaction.txid} onPress={async () => {
                                    navigation.navigate("TransactionScreen", {
                                        item: transaction
                                    })
                                }}>
                                    <View style={styles.transactionIconContainer}>
                                        {
                                            <LMImage
                                                source={transaction.sender ? require('../../../assets/img/send.png') : require('../../../assets/img/receive.png')}
                                                style={styles.transactionIcon}/>
                                        }
                                    </View>
                                    <View style={styles.transactionInformation}>
                                        <View style={{flex: 1}}>
                                            {
                                                transaction.status.confirmed ?
                                                    <LMText style={styles.time}>{transaction.time}</LMText> :
                                                    <LMImage source={require('../../../assets/img/loading.gif')} style={{
                                                        width: 24,
                                                        height: 24
                                                    }}/>
                                            }
                                            <LMText>{transaction.status.confirmed ? 'Confirmed' : 'Processing'}</LMText>
                                        </View>
                                        <LMText>{transaction.value}</LMText>
                                    </View>
                                </LMTouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <LMTouchableOpacity style={styles.receive} onPress={() => {
                    navigation.navigate("WalletDepositScreen")
                }}>
                    <View style={styles.buttonIcon}>
                        <LMImage source={require('../../../assets/img/receive.png')} style={styles.receiveIcon}/>
                    </View>
                    <View style={styles.buttonText}>
                        <LMText style={styles.receiveText}>{language.receive}</LMText>
                    </View>
                </LMTouchableOpacity>
                <View style={{width: 0.5, backgroundColor: 'white'}}></View>
                <LMTouchableOpacity style={styles.send} onPress={() => {
                    navigation.navigate("WalletWithdrawScreen")
                }}>
                    <View style={styles.buttonText}>
                        <LMText style={styles.receiveText}>{language.send}</LMText>
                    </View>

                    <View style={styles.buttonIcon}>
                        <LMImage source={require('../../../assets/img/send.png')} style={styles.receiveIcon}/>
                    </View>
                </LMTouchableOpacity>
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
        paddingLeft: 10,
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
    headerBg: {
        width: '100%',
        height: 200,
        position: 'absolute',
        paddingTop: getStatusBarHeight() + 44,
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonContainer: {
        minHeight: 50,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    image: {
        width: 99,
        height: 94,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    walletBalance: {
        flex: 2,
        justifyContent: 'center',
    },
    walletLatestTransaction: {
        flex: 1,
        justifyContent: 'space-between',
    },
    walletName: {
        color: Theme.colors.inverseForegroundColor,
        fontSize: 18
    },
    walletBalanceLabel: {
        color: Theme.colors.inverseForegroundColor,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 5
    },
    latestTransactionLabel: {
        color: Theme.colors.inverseForegroundColor,
        fontSize: 15
    },
    latestTransaction: {
        color: Theme.colors.inverseForegroundColor,
        fontSize: 15,
        fontWeight: 'bold'
    },
    walletInformation: {
        height: LMUtil.height(156, 109),
        paddingLeft: 10,
        paddingRight: 10,
    },
    transactionList: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    transactionTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: Theme.colors.foregroundColor,
        paddingHorizontal: 4,

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
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
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
    receiveIcon: {width: 32, height: 32, transform: [{rotate: '180deg'}]},
    receiveText: {color: Theme.colors.foregroundColor, fontSize: 16},
    transactionItem: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: '#d5d5d5'
    },
    transactionIconContainer: {
        width: 48,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transactionInformation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    transactionIcon: {
        width: 32,
        height: 32,
        transform: [{rotate: '180deg'}]
    },
    processing: {
        backgroundColor: Theme.colors.lnborderColor,
        width: 60,
        height: 20,
        borderRadius: 10
    },
    time: {
        color: Theme.colors.alternativeTextColor,
        fontSize: 13,
        fontWeight: '500',
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
