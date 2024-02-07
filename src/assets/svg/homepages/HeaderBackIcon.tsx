import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HeaderBackIcon(props: any) {
    return (
        <Svg
            width={24}
            height={22}
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M6.123 18h10.145a6.353 6.353 0 006.35-6.35 6.353 6.353 0 00-6.35-6.35H2.309"
                stroke="#4D4A48"
                strokeWidth={2.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M5.237 9.495L2 6.237 5.237 3"
                stroke="#4D4A48"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default HeaderBackIcon
