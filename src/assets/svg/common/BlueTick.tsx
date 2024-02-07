import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BlueTick(props: any) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8 1.333C4.327 1.333 1.333 4.327 1.333 8c0 3.673 2.994 6.667 6.667 6.667 3.674 0 6.667-2.994 6.667-6.667 0-3.673-2.993-6.667-6.667-6.667zm3.187 5.134l-3.78 3.78a.5.5 0 01-.707 0L4.814 8.36a.503.503 0 010-.707.503.503 0 01.706 0l1.534 1.534L10.48 5.76a.503.503 0 01.707 0 .503.503 0 010 .707z"
                fill="#8F7A6C"
            />
        </Svg>
    )
}

export default BlueTick
