import React from 'react';
import _ from 'lodash';
import FastImage from 'react-native-fast-image'

export default function LMImage({source, ...rest}) {
    let src = {};
    let def = true;
    if (Array.isArray(source)) {
        const last = _.findLast(source);
        src = {
            uri: last.src
        }
        def = false;
    } else {
        if (!_.isNil(source)) {
            if (typeof source === 'string') {
                src = {uri: source}
            } else {
                src = source;
            }
            def = false;
        }
    }
    return (
        <FastImage source={def ? require('../../../assets/img/btc-shape.png') : src} resizeMode={'cover'} {...rest}/>
    );
}
