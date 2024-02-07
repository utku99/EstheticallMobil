import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DropdownRightDownIcon(props: any) {
    return (
        <Svg
            width={40}
            height={43}
            viewBox="0 0 38 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M0 0h30a8 8 0 018 8v24a8 8 0 01-8 8H0V0z" fill="#FF8170" />
            <Path
                d="M20.289 27.024c-.737 1.474-2.84 1.474-3.578 0l-4.764-9.528a2 2 0 011.79-2.895h9.527a2 2 0 011.789 2.895l-4.764 9.528z"
                fill="#fff"
            />
        </Svg>
    )
}

export default DropdownRightDownIcon
