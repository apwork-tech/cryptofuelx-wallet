import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import WalletScreen from '../../screen/wallet/WalletScreen';
import AddWalletScreen from '../../screen/wallet/AddWalletScreen';
import WalletDetailScreen from '../../screen/wallet/WalletDetailScreen';
import WalletDepositScreen from '../../screen/wallet/WalletDepositScreen';
import WalletWithdrawScreen from '../../screen/wallet/WalletWithdrawScreen';
import WalletScannerScreen from '../../screen/wallet/WalletScannerScreen';
import ImportWalletScreen from '../../screen/wallet/ImportWalletScreen';
import MarketplaceDetailScreen from '../../screen/marketplace/MarketplaceDetailScreen';
import SearchContactScreen from '../../screen/contact/SearchContactScreen';
import AddContactScreen from '../../screen/contact/AddContactScreen';
import TransactionScreen from '../../screen/transaction/TransactionScreen';
import ContactScreen from '../../screen/contact/ContactScreen';
import UpdateContactScreen from '../../screen/contact/UpdateContactScreen';
import MarketplaceScreen from '../../screen/marketplace/MarketplaceScreen';
import WalletInformationScreen from '../../screen/wallet/WalletInformationScreen';
import WifScreen from '../../screen/wallet/WifScreen';

const Stack = createStackNavigator();

function MainStackNavigator({style}) {
    useEffect(() => {
    }, []);
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="WalletScreen" component={WalletScreen}/>
                <Stack.Screen
                    name="AddWalletScreen"
                    component={AddWalletScreen}
                />
                <Stack.Screen
                    name="WalletDetailScreen"
                    component={WalletDetailScreen}
                />
                <Stack.Screen
                    name="WalletDepositScreen"
                    component={WalletDepositScreen}
                />
                <Stack.Screen
                    name="WalletWithdrawScreen"
                    component={WalletWithdrawScreen}
                />
                <Stack.Screen
                    name="WalletScannerScreen"
                    component={WalletScannerScreen}
                />
                <Stack.Screen
                    name="ImportWalletScreen"
                    component={ImportWalletScreen}
                />
                <Stack.Screen
                    name="WalletInformationScreen"
                    component={WalletInformationScreen}
                />
                <Stack.Screen
                    name="MarketplaceScreen"
                    component={MarketplaceScreen}
                />
                <Stack.Screen
                    name="MarketplaceDetailScreen"
                    component={MarketplaceDetailScreen}
                />
                <Stack.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                />
                <Stack.Screen
                    name="SearchContactScreen"
                    component={SearchContactScreen}
                />
                <Stack.Screen
                    name="AddContactScreen"
                    component={AddContactScreen}
                />
                <Stack.Screen
                    name="TransactionScreen"
                    component={TransactionScreen}
                />
                <Stack.Screen
                    name="UpdateContactScreen"
                    component={UpdateContactScreen}
                />
                <Stack.Screen
                    name="WifScreen"
                    component={WifScreen}
                />

            </Stack.Navigator>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
});
export default MainStackNavigator;
