import * as React from "react"
import Svg, {Mask, Path} from "react-native-svg"
import {Theme} from '../Theme';

function MoreIcon(props) {
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
                d="M3 12a2 2 0 114.001.001A2 2 0 013 12zm9-2a2 2 0 10.001 4.001A2 2 0 0012 10zm7 0a2 2 0 10.001 4.001A2 2 0 0019 10z"
                fill={bg}
            />
            <Mask
                id="prefix__a"
                maskUnits="userSpaceOnUse"
                x={3}
                y={10}
                width={18}
                height={4}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 12a2 2 0 114.001.001A2 2 0 013 12zm9-2a2 2 0 10.001 4.001A2 2 0 0012 10zm7 0a2 2 0 10.001 4.001A2 2 0 0019 10z"
                    fill="#fff"
                />
            </Mask>
        </Svg>
    )
}

export default MoreIcon
