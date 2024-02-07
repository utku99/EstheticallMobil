import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SecurityIcon(props: any) {
    return (
        <Svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M28.752 15.29V9.254c0-1.128-.853-2.407-1.912-2.833l-7.659-3.135a7.132 7.132 0 00-5.376 0L6.147 6.421c-1.045.426-1.898 1.705-1.898 2.833v6.036c0 6.724 4.881 13.021 11.55 14.864.454.123.949.123 1.402 0 6.67-1.843 11.55-8.14 11.55-14.864zm-11.22 2.406v3.616c0 .564-.468 1.032-1.032 1.032a1.039 1.039 0 01-1.031-1.032v-3.616c-1.389-.44-2.406-1.732-2.406-3.259A3.439 3.439 0 0116.5 11a3.439 3.439 0 013.438 3.437c0 1.54-1.018 2.82-2.406 3.26z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default SecurityIcon
