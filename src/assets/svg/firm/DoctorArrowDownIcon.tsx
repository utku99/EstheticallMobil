import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DoctorArrowDownIcon(props: any) {
    return (
        <Svg
            width={25}
            height={11}
            viewBox="0 0 25 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M1 1l11.408 8.655L23.816 1"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default DoctorArrowDownIcon
