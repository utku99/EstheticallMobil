import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SharingSavedIcon(props: any) {
    return (
        <Svg
            width={16}
            height={23}
            viewBox="0 0 16 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M 13.417 1.475 H 2.555 a 1.126 1.126 0 0 0 -1.127 1.122 v 17.74 a 1.106 1.106 0 0 0 0.69 1.035 a 1.128 1.128 0 0 0 1.229 -0.234 l 4.505 -4.425 a 0.192 0.192 0 0 1 0.268 0 l 4.507 4.423 a 1.126 1.126 0 0 0 1.228 0.234 a 1.106 1.106 0 0 0 0.689 -1.033 V 2.597 a 1.126 1.126 0 0 0 -1.127 -1.122 z z"
                fill="#FF8170"
                stroke="#FF8170"
                strokeWidth={0.370113}
            />
        </Svg>
    )
}

export default SharingSavedIcon
