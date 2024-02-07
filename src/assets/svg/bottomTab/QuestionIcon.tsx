import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QuestionIcon(props: any) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17 18.43h-4l-4.45 2.96A.997.997 0 017 20.56v-2.13c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5z"
                stroke="#4D4A48"
                strokeWidth={1.5}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 11.36v-.21c0-.68.42-1.04.84-1.33.41-.28.82-.64.82-1.3 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66M11.995 13.75h.01"
                stroke="#4D4A48"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default QuestionIcon
