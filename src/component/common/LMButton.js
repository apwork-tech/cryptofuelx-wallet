import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../Theme';

export default function LMButton({...rest}) {
    const {label, labelStyle, style} = {...rest};
    return (
        <TouchableOpacity {...rest} style={[styles.container, style]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.hdborderColor,
        borderRadius: 5
    },

    label: {
        color: 'white',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400'
    }
});
