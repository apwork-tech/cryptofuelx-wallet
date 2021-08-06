import React from 'react';
import {Platform} from 'react-native';

const LMUtil = {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
    height : (android,ios) => {
        return Platform.OS == 'ios' ? ios : android
    },
    randomColor : () => { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; }
};
export default LMUtil;
