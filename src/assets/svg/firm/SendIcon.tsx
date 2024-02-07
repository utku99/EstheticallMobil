import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SendIcon(props: any) {
    return (
        <Svg
            width={27}
            height={27}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.985 3.707l-9.783 3.25c-6.575 2.199-6.575 5.785 0 7.973l2.904.964.964 2.903c2.188 6.576 5.785 6.576 7.973 0l3.261-9.771c1.452-4.388-.932-6.782-5.32-5.32zm.346 5.828l-4.116 4.138a.804.804 0 01-.574.239.804.804 0 01-.574-.239.817.817 0 010-1.148l4.116-4.138a.817.817 0 011.148 0 .817.817 0 010 1.148z"
                fill={props.fill ?? "#fff"}
            />
        </Svg>
    )
}

export default SendIcon
