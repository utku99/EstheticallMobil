import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DropdownRightUpIcon(props: any) {
    return (
        <Svg
            width={40}
            height={43}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M0 0h31a7 7 0 017 7v24a7 7 0 01-7 7H0V0z" fill="#FF8170" />
            <Path
                d="M17.211 14.578c.737-1.474 2.84-1.474 3.578 0l4.764 9.528A2 2 0 0123.763 27h-9.527a2 2 0 01-1.789-2.894l4.764-9.528z"
                fill="#fff"
            />
        </Svg>
    )
}

export default DropdownRightUpIcon
