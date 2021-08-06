import * as React from 'react';
import Svg, {Mask, Path} from 'react-native-svg';
import {Theme} from '../Theme';


function Network(props) {
    const {color} = props;
    let bg = Theme.colors.foregroundColor;
    if (color) {
        bg = color;
    }
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 4c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1zm-7 4c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1zm-8 5c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1v-7z"
                fill={bg}
            />
            <Mask
                id="prefix__a"
                maskUnits="userSpaceOnUse"
                x={4}
                y={4}
                width={16}
                height={17}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 4c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1zm-7 4c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1zm-8 5c0-.55.45-1 1-1s1 .45 1 1v7c0 .55-.45 1-1 1s-1-.45-1-1v-7z"
                    fill="#fff"
                />
            </Mask>
        </Svg>
    );
}

export default Network;
