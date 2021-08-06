import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MainStackNavigator from './MainStackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import LMImage from '../../component/common/LMImage';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import ChevronRight from '../../component/icon/ChevronRight';
import LMText from '../../component/common/LMText';
import Flag from 'react-native-flags-typescript';
import LMSelect from '../../component/common/LMSelect';
import {LanguageAction} from '../../persistence/language/LanguageAction';
import {Theme} from '../../component/Theme';

const Drawer = createDrawerNavigator();
const DrawerContent = ({navigation}) => {
    const dispatch = useDispatch();
    const {language, languages, defaultLanguage} = useSelector(state => state.LanguageReducer)
    const onLanguageChange = () => {
        LMSelect.show({
            data: languages,
            onPress: (item) => {
                dispatch(LanguageAction.set(item.code)).then(() => {
                    dispatch(LanguageAction.setDefault(item));
                });
            },
            key: 'code',
            label: 'name',
            renderItem: (item) => {
                return (
                    <>
                        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                            <Flag
                                code={item.icon}
                                size={32}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 14}}>{item.name}</Text>
                        </View>
                    </>
                );
            },
        });
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <View style={{height: 100, justifyContent: 'center', width: '100%', paddingLeft: 20}}>
                <LMImage source={require('../../../assets/img/icon.png')} style={{width: 90, height: 90}}/>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 15,
                paddingTop: 15
            }}>
                <LMTouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("WalletScreen");
                }}>
                    <View style={styles.menuTitle}>
                        <LMText>{language.home}</LMText>
                    </View>
                    <View style={styles.menuIcon}>
                        <ChevronRight/>
                    </View>
                </LMTouchableOpacity>
                <LMTouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("ContactScreen");
                }}>
                    <View style={styles.menuTitle}>
                        <LMText>{language.contact}</LMText>
                    </View>
                    <View style={styles.menuIcon}>
                        <ChevronRight/>
                    </View>
                </LMTouchableOpacity>
                <LMTouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("MarketplaceScreen");
                }}>
                    <View style={styles.menuTitle}>
                        <LMText>{language.marketPlace}</LMText>
                    </View>
                    <View style={styles.menuIcon}>
                        <ChevronRight/>
                    </View>
                </LMTouchableOpacity>
                <LMTouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("AboutUsScreen");
                }}>
                    <View style={styles.menuTitle}>
                        <LMText>{language.aboutUs}</LMText>
                    </View>
                    <View style={styles.menuIcon}>
                        <ChevronRight/>
                    </View>
                </LMTouchableOpacity>
                <LMTouchableOpacity style={styles.menuItem} onPress={() => {
                    onLanguageChange();
                }}>
                    <View style={styles.menuTitle}>
                        <LMText>{language.currentLanguage}</LMText>
                    </View>
                    <View style={styles.menuIcon}>
                        <Flag code={defaultLanguage.icon} size={32}/>
                    </View>
                </LMTouchableOpacity>
                <Text style={{position: 'absolute', bottom: 0, color: Theme.colors.alternativeTextColor, fontSize: 10}}>
                    Powered by @LM
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default function DrawerNavigator(props) {
    const [progress, setProgress] = useState(new Animated.Value(0));
    const {lang} = props;
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });
    const animatedStyle = {borderRadius, transform: [{scale: scale}]};

    return (
        <Drawer.Navigator
            initialRouteName="Showing"
            drawerType="slide"
            overlayColor="transparent"
            drawerStyle={styles.drawerStyles}
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
                activeTintColor: 'white',
                inactiveTintColor: 'white',
            }}
            sceneContainerStyle={{backgroundColor: 'white'}}
            drawerContent={props => {
                setProgress(props.progress);
                return <DrawerContent {...props} lang={lang}/>;
            }}
        >
            <Drawer.Screen name="Screens">
                {props => {
                    return <MainStackNavigator {...props} lang={lang} style={animatedStyle}/>;
                }}
            </Drawer.Screen>
        </Drawer.Navigator>

    );
}
const styles = StyleSheet.create({
    text: {fontSize: 12, fontWeight: '400'},
    drawerStyles: {flex: 1, width: '60%', backgroundColor: 'transparent'},
    menuItem: {
        width: '100%', height: 50, flexDirection: 'row', marginBottom: 5,
        borderBottomWidth: 0.2,
        borderBottomColor: '#e3e3e3',
    },
    menuIcon: {
        width: 24, height: 50, justifyContent: 'center', alignItems: 'center'
    },
    menuTitle: {
        paddingLeft: 16, flex: 1, justifyContent: 'center'
    }
});


