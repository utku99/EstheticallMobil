import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SharingSendMessageIcon(props: any) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M0 0h32a8 8 0 018 8v24a8 8 0 01-8 8H0V0z" fill="#FF8170" />
            <Path
                d="M24.485 10.207l-9.783 3.25c-6.575 2.199-6.575 5.785 0 7.973l2.904.964.964 2.904c2.188 6.575 5.785 6.575 7.973 0l3.261-9.772c1.452-4.388-.932-6.782-5.32-5.32zm.346 5.828l-4.116 4.138a.804.804 0 01-.574.239.803.803 0 01-.574-.239.817.817 0 010-1.148l4.116-4.138a.817.817 0 011.148 0 .817.817 0 010 1.148z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SharingSendMessageIcon
