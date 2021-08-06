import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Theme} from '../Theme';


function Contact(props) {
    const {color} = props;
    let bg = Theme.colors.foregroundColor;
    if (color) {
        bg = color;
    }
    return (
        <Svg
            width={36}
            height={36}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.22 18.06a6.966 6.966 0 00-5.45-2.62c-2.1 0-3.99.93-5.25 2.39A7.984 7.984 0 014 12c0-4.42 3.58-8 8-8a7.998 7.998 0 015.22 14.06zM12 20c-1.4 0-2.71-.36-3.85-.99a4.9 4.9 0 013.62-1.57c1.51 0 2.87.67 3.77 1.73A7.95 7.95 0 0112 20zm0-18C6.48 2 2 6.48 2 12c0 3 1.32 5.69 3.42 7.52.51.46 1.07.85 1.67 1.19C8.54 21.53 10.22 22 12 22c1.63 0 3.17-.39 4.53-1.09.61-.31 1.19-.68 1.72-1.11A9.964 9.964 0 0022 12c0-5.52-4.48-10-10-10zm-.23 10.23c-1.11 0-2-.89-2-2a2 2 0 112 2zm0-6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
                fill={bg}
            />
        </Svg>
    );
}

export default Contact;
