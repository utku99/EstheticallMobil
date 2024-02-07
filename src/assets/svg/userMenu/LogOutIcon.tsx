import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogOutIcon(props: any) {
    return (
        <Svg
            width={29}
            height={29}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20.1 2.401h-3.033C13.333 2.401 11 4.735 11 8.468v4.725h7.292c.478 0 .875.397.875.875a.881.881 0 01-.875.875H11v4.725c0 3.733 2.333 6.067 6.067 6.067h3.021c3.734 0 6.067-2.334 6.067-6.067v-11.2c.012-3.733-2.322-6.067-6.055-6.067zM5.82 13.193l2.416-2.415a.865.865 0 00.256-.618.846.846 0 00-.256-.619.88.88 0 00-1.237 0L3.091 13.45a.88.88 0 000 1.237l3.908 3.908a.88.88 0 001.237 0 .88.88 0 000-1.237L5.82 14.943H11v-1.75H5.82z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default LogOutIcon
