import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CommentIcon(props: any) {
    return (
        <Svg
            width={29}
            height={28}
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20.333 2.834H8.666c-3.5 0-5.833 2.334-5.833 5.834v7c0 3.5 2.333 5.833 5.833 5.833h4.667l5.192 3.453a1.163 1.163 0 001.808-.968V21.5c3.5 0 5.833-2.333 5.833-5.833v-7c0-3.5-2.333-5.834-5.833-5.834zm-1.75 10.29h-8.167a.881.881 0 01-.875-.875c0-.478.397-.875.875-.875h8.167c.478 0 .875.397.875.875a.881.881 0 01-.875.875z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default CommentIcon
