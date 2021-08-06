import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Theme} from '../Theme';

export default function LMTextInput({...rest}) {
    const {error, label, labelStyle, style, hint, onHintPress, editable} = {...rest};
    const isErrorVisible = error !== undefined ? true : false;
    return (
        <View style={styles.container}>
            {
                label && (
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.label, labelStyle]}>{label}</Text>
                        {
                            hint &&
                            <TouchableOpacity onPress={onHintPress}>
                                <Text style={[styles.hint]}>{hint}</Text>
                            </TouchableOpacity>

                        }
                    </View>
                )
            }
            <TextInput {...rest} style={[styles.textInput, style, {color: editable ? 'black' : 'black'}]}/>
            {
                isErrorVisible && <Text style={styles.error}>{error['message']}</Text>
            }
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 75,
        justifyContent: 'center',
        marginTop: 5,
    },
    textInput: {
        paddingLeft: 5,
        width: '100%',
        height: 50,
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: '#d5d5d5',
        backgroundColor: 'white',
    },
    label: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400'
    },
    hint: {marginLeft: 5, color: 'gray', fontWeight: 'bold', fontStyle: 'italic', fontSize: 10},
    error: {color: 'red', fontWeight: 'bold'},
});
