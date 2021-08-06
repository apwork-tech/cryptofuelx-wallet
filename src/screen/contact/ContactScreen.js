import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LMTouchableOpacity from '../../component/common/LMTouchableOpacity';
import LMText from '../../component/common/LMText';
import {Theme} from '../../component/Theme';
import Exit from '../../component/icon/Exit';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import UserAvatar from 'react-native-user-avatar';
import LMButton from '../../component/common/LMButton';

export default function ContactScreen({navigation}) {
    const {contacts} = useSelector(state => state.ContactReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const dispatch = useDispatch();
    useEffect(async () => {

    }, []);
    const onRefresh = () => {

    };
    return (
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
                <View style={styles.contactList}>
                    {
                        _.map(contacts, function (item) {

                            return (
                                <LMTouchableOpacity style={styles.contactItem} key={item.id} onPress={async () => {
                                    navigation.navigate("UpdateContactScreen", {item: item});
                                }}>
                                    <View style={styles.contactItemIcon}>
                                        <UserAvatar size={48} name={item.name}/>
                                    </View>
                                    <View style={styles.contactItemInformation}>
                                        <LMText style={styles.contactItemTitle}>{item.name}</LMText>
                                        <LMText style={styles.contactItemDesc}>{item.address}</LMText>
                                    </View>
                                </LMTouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <LMButton label={language.add} onPress={() => {
                    navigation.navigate("AddContactScreen");
                }}/>
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
        flex: 1
    },
    contactItem: {
        width: '100%',
        minHeight: 70,
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        borderBottomColor: '#e5e5e5',
        marginBottom: 15
    },
    contactItemIcon: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactIcon: {
        width: 50,
        height: 50,
    },
    contactItemInformation: {
        flex: 1
    },
    contactItemTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    contactItemDesc: {
        color: Theme.colors.alternativeTextColor,
        fontSize: 13
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
    drawer: {justifyContent: 'center', alignItems: 'flex-end', width: 50, height: '100%'}
});
