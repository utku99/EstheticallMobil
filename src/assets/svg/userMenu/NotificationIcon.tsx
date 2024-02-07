import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationIcon(props: any) {
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
                d="M16.486 23.333h-4.083c-.817 0-1.517.934-1.05 1.75.7 1.05 1.867 1.75 3.15 1.75s2.45-.7 3.033-1.75c.467-.816-.116-1.75-1.05-1.75zM25.936 19.483l-.467-.584c-1.867-2.45-2.8-5.367-2.8-8.4v-.817c0-4.2-3.034-7.933-7.234-8.4-4.9-.583-9.1 3.267-9.1 8.05V10.5c0 3.034-.933 5.95-2.8 8.4l-.467.584c-.233.233-.35.7-.233.933.35 1.05 1.283 1.75 2.333 1.75h18.667c1.05 0 1.984-.7 2.217-1.75.117-.35 0-.7-.116-.933z"
                fill="#FF8170"
            />
        </Svg>
    )
}

export default NotificationIcon
