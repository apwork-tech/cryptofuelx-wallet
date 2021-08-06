import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import _ from 'lodash';
import {Theme} from '../../component/Theme';
import LMImage from '../../component/common/LMImage';
import {useSelector} from 'react-redux';
import marketPlaces from '../../data/MarketPlace.json';
import Exit from '../../component/icon/Exit';

export default function MarketplaceScreen({navigation}) {
    const {language} = useSelector(state => state.LanguageReducer);
    useEffect(async () => {

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMText style={styles.headerTitle}>{language.marketPlace}</LMText>
                <LMTouchableOpacity style={styles.drawer} onPress={() => {
                    navigation.goBack();
                }}>
                    <Exit/>
                </LMTouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.transactionList}>
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
            width: 23,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
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
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Theme.colors.foregroundColor,
        paddingHorizontal: 4,
    },
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
