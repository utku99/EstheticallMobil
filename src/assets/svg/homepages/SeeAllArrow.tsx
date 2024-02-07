import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SeeAllArrow(props: any) {
    return (
        <Svg
            width={18}
            height={15}
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.908 5.536l-8.626 8.74-8.626-8.74V.064l8.626 8.778L17.908.064v5.472z"
                fill="#4D4A48"
            />
        </Svg>
    )
}

export default SeeAllArrow
