import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props: any) {
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
                d="M21.146 8.576l-7.55-6.135a2.543 2.543 0 00-3.192 0L2.855 8.575a1.119 1.119 0 00-.416.873v11.543c0 .62.505 1.13 1.125 1.13h5.062c.62 0 1.125-.51 1.125-1.13v-7.306h4.499v7.306c0 .62.505 1.13 1.125 1.13h5.062c.62 0 1.125-.51 1.125-1.13V9.448a1.122 1.122 0 00-.416-.872zm-.71 12.421h-5.062V13.68c0-.62-.505-1.119-1.125-1.119H9.75c-.62 0-1.125.5-1.125 1.12v7.316H3.564V9.448l7.55-6.134a1.411 1.411 0 011.773 0l7.55 6.134-.001 11.55z"
                fill="#4D4A48"
                stroke="#4D4A48"
                strokeWidth={0.5}
            />
        </Svg>
    )
}

export default HomeIcon
