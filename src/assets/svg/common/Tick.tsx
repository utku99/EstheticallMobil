import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Tick(props: any) {
    return (
        <Svg
            width={26}
            height={18}
            viewBox="0 0 26 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.75 17.775L.975 9.108l2.383-2.383 6.392 6.5 12.891-13 2.384 2.383L9.75 17.775z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default Tick
