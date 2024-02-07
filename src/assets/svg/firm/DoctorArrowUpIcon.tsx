import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DoctorArrowUpIcon(props: any) {
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
                d="M23.908 9.654L12.5 1 1.092 9.654"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default DoctorArrowUpIcon
