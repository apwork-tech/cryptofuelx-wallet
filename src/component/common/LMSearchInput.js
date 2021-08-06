import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';

function LMSearchInput({...rest}) {
    const {leftIcon, rightIcon, onLeftIconClick, onRightIconClick, style, inputStyle, value} = {...rest};
    const displayLeftIcon = leftIcon !== undefined ? true : false;
    const inputRef = useRef(null);
    const displayRightIcon = () => {
        if (value == '') {
            return false;
        } else {
            return true;
        }
    };
    return (
        <View style={[styles.body, style]}>
            <View style={[styles.inputContainer]}>
                {
                    displayLeftIcon &&
                    <View style={styles.leftIcon}>
                        {leftIcon}
                    </View>
                }
                <TextInput {...rest} style={[styles.input, inputStyle]} ref={inputRef}/>
                {
                    displayRightIcon() &&
                    <TouchableOpacity style={styles.rightIcon} onPress={onRightIconClick}>
                        {rightIcon}
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
export default LMSearchInput;
const styles = StyleSheet.create({
    body: {
        height: 48,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },
    inputContainer: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 10,
        paddingRight: 10,
        paddingLeft: 10
    },

    rightIcon: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',

    },
    leftIcon: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
