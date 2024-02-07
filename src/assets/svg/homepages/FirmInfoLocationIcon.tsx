import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FirmInfoLocationIcon(props: any) {
    return (
        <Svg
            width={27}
            height={33}
            viewBox="0 0 27 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.637 12.021c0 2.508 1.955 4.54 4.369 4.54 2.413 0 4.368-2.032 4.368-4.54 0-2.507-1.955-4.539-4.368-4.539-2.414 0-4.37 2.032-4.37 4.54zm14.081-2.177C21.535 4.435 16.994 2 13.006 2h-.012c-3.977 0-8.53 2.423-9.712 7.832C1.963 15.873 5.524 20.99 8.746 24.21 9.941 25.403 11.473 26 13.006 26a5.96 5.96 0 004.247-1.791c3.223-3.22 6.784-8.324 5.465-14.365z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default FirmInfoLocationIcon
