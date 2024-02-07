import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HeaderMenuIcon(props: any) {
    return (
        <Svg
            width={20}
            height={17}
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1.5A1.5 1.5 0 011.5 0h17a1.5 1.5 0 010 3h-17A1.5 1.5 0 010 1.5zM0 15.5A1.5 1.5 0 011.5 14h17a1.5 1.5 0 010 3h-17A1.5 1.5 0 010 15.5zM0 8.5A1.5 1.5 0 011.5 7h17a1.5 1.5 0 010 3h-17A1.5 1.5 0 010 8.5z"
                fill="#4D4A48"
            />
        </Svg>
    )
}

export default HeaderMenuIcon
