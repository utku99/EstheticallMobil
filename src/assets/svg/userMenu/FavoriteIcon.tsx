import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FavoriteIcon(props: any) {
    return (
        <Svg
            width={30}
            height={28}
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M15.418 5.065l-.918.996-.918-.996c-2.535-2.752-6.645-2.752-9.18 0-2.536 2.752-2.536 7.216 0 9.97l.917.996L14.5 26l9.18-9.97.919-.996c2.535-2.752 2.535-7.216 0-9.97-2.535-2.752-6.646-2.752-9.18.002z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default FavoriteIcon
