import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {Theme} from '../Theme';


function Copy(props) {
    const {color} = props;
    let bg = Theme.colors.foregroundColor;
    if (color) {
        bg = color;
    }
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 32 32"
            fill="none"
            stroke={bg}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-clipboard"
            {...props}
        >
            <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
            <Rect x={8} y={2} width={8} height={4} rx={1} ry={1}/>
        </Svg>
    );
}

const styles = StyleSheet.create({
    container: {},
});
export default Copy;
