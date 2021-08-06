import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Theme} from '../Theme';

function LMText({...rest}) {
    const {children, style} = {...rest};
    return (
        <Text {...rest} style={[styles.label, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({

    label: {
        color: Theme.colors.foregroundColor,
        fontWeight: '400'
    },
});
export default LMText;
