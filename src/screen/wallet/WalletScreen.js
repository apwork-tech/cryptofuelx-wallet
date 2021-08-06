import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import LMButton from '../../component/common/LMButton';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import MoreIcon from '../../component/icon/MoreIcon';
import LMText from '../../component/common/LMText';
import Plus from '../../component/icon/Plus';
import _ from 'lodash';
import {Theme} from '../../component/Theme';
import LinearGradient from 'react-native-linear-gradient';
import LMImage from '../../component/common/LMImage';
import {useDispatch, useSelector} from 'react-redux';
import {WalletAction} from '../../persistence/wallet/WalletAction';
import marketPlaces from '../../data/MarketPlace.json';
import LMNetworkSelector from '../../component/common/LMNetworkSelector';
import LMUtil from '../../util/LMUtil';

export default function WalletScreen({navigation}) {
    const {language} = useSelector(state => state.LanguageReducer);
    const [refreshing, setRefreshing] = useState(false);
    const {wallets} = useSelector(state => state.WalletReducer);
    const {activeNetwork} = useSelector(state => state.NetworkReducer);
    const flatListRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(WalletAction.list({network: activeNetwork}));
    }, []);
    const onRefresh = () => {
        dispatch(WalletAction.list({network: activeNetwork}));
        setRefreshing(false);
    };
    const {width} = useWindowDimensions();
    const onSnapToItem = e => {
        const contentOffset = e.nativeEvent.contentOffset;
        const index = Math.ceil(contentOffset.x / width);
    };
    const walletCard = (item) => {
        const width = 350;
        return (
            <LMTouchableOpacity style={[styles.walletItemContainer, {width: width}]} onPress={() => {
                dispatch(WalletAction.setActiveWallet(item)).then(() => {
                    navigation.navigate("WalletDetailScreen");
                });
            }}>
                <LinearGradient colors={['#6CD9FC', '#44BEE5']} style={[styles.itemBg, {width: 330}]}>
                    <View style={styles.walletBalance}>
                        <LMText style={styles.walletName}>{item.name}</LMText>
                        <LMText style={styles.walletBalanceLabel}>{item.balance} BTC</LMText>
                    </View>
                    <View style={styles.walletLatestTransaction}>
                        <LMText style={styles.latestTransactionLabel}>{language.latestTransaction}</LMText>
                        <LMText style={styles.latestTransaction}>{item.latestTransaction == '' ? language.noData : item.latestTransaction}</LMText>
                    </View>

                    <LMImage source={require('../../../assets/img/btc-shape.png')} style={styles.image}/>
                </LinearGradient>
            </LMTouchableOpacity>
        )
    };
    const addWalletCard = (item) => {
        const width = 425;
        return (
            <View style={[styles.walletItemContainer, {width: width}]}>
                <View style={[styles.itemBg, {width: 330, borderRadius: 10}]}>
                    <View style={styles.walletBalance}>
                        <LMText style={styles.addWallet}>{language.addAWallet}</LMText>
                        <LMText style={styles.addWalletDesc}>{language.itsFree}</LMText>
                    </View>
                    <View style={styles.walletLatestTransaction}>
                        <LMButton label={language.addNow} style={{width: 100, height: 35}} onPress={() => {
                            navigation.navigate("AddWalletScreen");
                        }}/>
                    </View>
                </View>
            </View>
        )
    };
    const renderItem = ({item}) => {
        const {address} = item;
        if (address === "NONE") {
            return addWalletCard(item)
        }
        return walletCard(item);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMNetworkSelector/>
                <LMTouchableOpacity style={styles.drawer} onPress={() => {
                    navigation.toggleDrawer();
                }}>
                    <MoreIcon/>
                </LMTouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <View style={styles.walletList}>
                    <View style={styles.walletHeader}>
                        <LMText style={styles.walletHeaderTitle}>{language.wallets}</LMText>
                        <LMTouchableOpacity onPress={() => {
                            navigation.navigate("AddWalletScreen");
                        }}>
                            <Plus/>
                        </LMTouchableOpacity>
                    </View>
                    <FlatList
                        ref={flatListRef}
                        data={wallets}
                        renderItem={renderItem}
                        keyExtractor={item => item.address}
                        horizontal={true}
                        snapToInterval={350}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onSnapToItem}
                        initialNumToRender={10}
                        removeClippedSubviews={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={styles.transactionList}>
                    <LMText style={[styles.walletHeaderTitle, {fontSize: 24}]}>{language.marketPlace}</LMText>
                    <View style={styles.marketPlaceList}>
                        {
                            _.map(marketPlaces, function (item) {
                                return (
                                    <LMTouchableOpacity style={styles.marketPlaceItem} key={item.id} onPress={() => {
                                        navigation.navigate("MarketplaceDetailScreen", {item: item})
                                    }}>
                                        <View style={styles.marketPlaceItemIcon}>
                                            <LMImage source={{uri: item.logo}} style={styles.marketPlaceIcon}/>
                                        </View>
                                        <View style={styles.marketPlaceItemInformation}>
                                            <LMText style={styles.marketPlaceItemTitle}>{item.name}</LMText>
                                            <LMText style={styles.marketPlaceItemDesc}>{item.desc}</LMText>
                                        </View>
                                    </LMTouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>

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
    scrollContent: {
        top: 0,
        left: 0,
        right: 0,
    },
    walletList: {
        height: 250,
        width: '100%'
    },
    walletItemContainer: {
        paddingLeft: 10,
        height: 190,

    },
    separator: {
        width: 10,
        height: '100%'
    },
    image: {
        width: 99,
        height: 94,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    itemBg: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        backgroundColor: Theme.colors.lightButton,
        shadowColor: Theme.colors.outputValue,
        shadowOffset: {
            width: LMUtil.height(23, 3),
            height: 8,
        },
        shadowOpacity: LMUtil.height(0.44, 0.14),
        shadowRadius: LMUtil.height(10.23, 3),
        elevation: 5,
    },
    walletHeader: {
        height: 44,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    walletHeaderTitle: {
        fontWeight: 'bold',
        fontSize: 34,
        color: Theme.colors.foregroundColor,
        paddingHorizontal: 4,
    },
    walletBalance: {
        flex: 3,
        justifyContent: 'center',
    },
    walletLatestTransaction: {
        flex: 1,
        justifyContent: 'space-between'
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
        fontSize: 13
    },
    latestTransaction: {
        color: Theme.colors.inverseForegroundColor,
        fontSize: 15,
        fontWeight: 'bold'
    },
    addWallet: {
        fontSize: 24,
        color: Theme.colors.foregroundColor
    },
    addWalletDesc: {
        fontSize: 14,
        color: Theme.colors.alternativeTextColor,
        fontStyle: 'italic'
    },
    transactionList: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 10
    },
    marketPlaceItem: {
        width: '100%',
        minHeight: 70,
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        borderBottomColor: '#e5e5e5',
        marginBottom: 15
    },
    marketPlaceItemIcon: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marketPlaceIcon: {
        width: 50,
        height: 50,
    },
    marketPlaceItemInformation: {
        flex: 1
    },
    marketPlaceItemTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    marketPlaceItemDesc: {
        color: Theme.colors.alternativeTextColor,
        fontSize: 13
    },
    marketPlaceList: {
        marginTop: 10
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
