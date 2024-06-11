import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Muted(props: any) {
  return (
    <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16 9.5l5 5m0-5l-5 5M4.6 9h.901c.551 0 .827 0 1.082-.069a2 2 0 00.631-.295c.216-.152.393-.364.746-.787l2.625-3.151c.436-.523.654-.785.844-.812a.5.5 0 01.442.16C12 4.19 12 4.53 12 5.21v13.58c0 .681 0 1.021-.129 1.164a.5.5 0 01-.442.16c-.19-.027-.408-.289-.844-.811L7.96 16.15c-.353-.423-.53-.634-.746-.787a1.999 1.999 0 00-.631-.295C6.328 15 6.053 15 5.5 15H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 14.24 3 13.96 3 13.4v-2.8c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C3.76 9 4.04 9 4.6 9z"
        stroke="white"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Muted;
