import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props: any) {
    return (
        <Svg
            width={13}
            height={16}
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M6.671 0A5.801 5.801 0 00.876 5.795c0 3.965 5.186 9.786 5.407 10.032.207.23.57.23.776 0 .221-.246 5.407-6.067 5.407-10.032C12.466 2.599 9.866 0 6.67 0zm0 8.71a2.919 2.919 0 01-2.915-2.915A2.919 2.919 0 016.67 2.879a2.919 2.919 0 012.915 2.916A2.919 2.919 0 016.671 8.71z"
                fill={props.fill}
            />
        </Svg>
    )
}

export default LocationIcon
