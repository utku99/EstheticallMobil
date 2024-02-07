import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SharingSaveIcon(props: any) {
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
                d="M13.417 1.475H2.555a1.126 1.126 0 00-1.127 1.122v17.74a1.106 1.106 0 00.69 1.035 1.128 1.128 0 001.229-.234l4.505-4.425a.192.192 0 01.268 0l4.507 4.423a1.126 1.126 0 001.228.234 1.106 1.106 0 00.689-1.033V2.597a1.126 1.126 0 00-1.127-1.122zm.19 18.862a.178.178 0 01-.115.17.182.182 0 01-.21-.04l-4.506-4.423a1.134 1.134 0 00-1.582 0L2.69 20.468a.185.185 0 01-.21.039.178.178 0 01-.115-.17V2.597a.189.189 0 01.19-.185h10.862a.189.189 0 01.19.185v17.74z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={0.370113}
            />
        </Svg>
    )
}

export default SharingSaveIcon
