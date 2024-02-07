import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function EyeOpen(props: any) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_7128_16484)" fill={props.fill}>
                <Path d="M11.955 8.138A3.858 3.858 0 008.107 12a3.858 3.858 0 003.848 3.862A3.858 3.858 0 0015.803 12a3.858 3.858 0 00-3.848-3.862zm-.292 2.717c-.478 0-.876.4-.876.879H9.513c.027-1.2.982-2.158 2.15-2.158v1.279z" />
                <Path d="M23.63 11.2c-1.3-1.624-5.943-6.925-11.675-6.925-5.732 0-10.376 5.301-11.676 6.926-.372.453-.372 1.119 0 1.598 1.3 1.625 5.944 6.926 11.676 6.926s10.376-5.301 11.676-6.926c.371-.453.371-1.119 0-1.598zm-11.675 6.394c-3.079 0-5.573-2.504-5.573-5.594 0-3.09 2.494-5.594 5.573-5.594 3.078 0 5.572 2.504 5.572 5.594 0 3.09-2.494 5.594-5.572 5.594z" />
            </G>
            <Defs>
                <ClipPath id="clip0_7128_16484">
                    <Path fill="#fff" d="M0 0H23.9094V24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default EyeOpen
