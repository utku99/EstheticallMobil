import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function InstutituonIcon(props: any) {
    return (
        <Svg
            width={22}
            height={20}
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_6263_15404)">
                <Path
                    d="M20.9 4.4h-6.6a1.1 1.1 0 00-1.1 1.1v3.3H11V1.1A1.1 1.1 0 009.9 0H1.1A1.1 1.1 0 000 1.1v17.6a1.1 1.1 0 001.1 1.1h19.8a1.1 1.1 0 001.1-1.1V5.5a1.1 1.1 0 00-1.1-1.1zM6.6 3.3h2.2v2.2H6.6V3.3zm-2.2 11H2.2v-2.2h2.2v2.2zm0-4.4H2.2V7.7h2.2v2.2zm0-4.4H2.2V3.3h2.2v2.2zm4.4 8.8H6.6v-2.2h2.2v2.2zm0-4.4H6.6V7.7h2.2v2.2zm9.9 4.4h-2.2v-2.2h2.2v2.2zm0-4.4h-2.2V7.7h2.2v2.2z"
                    fill="#FF8170"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_6263_15404">
                    <Path fill="#fff" d="M0 0H22V19.8H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default InstutituonIcon
