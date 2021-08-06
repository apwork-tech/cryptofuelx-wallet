import React from 'react';
import {FlatList} from 'react-native';

export default function LMFlatList(props) {
    const {data, renderItem} = props;
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            initialNumToRender={10}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...props}
        />
    )
}
